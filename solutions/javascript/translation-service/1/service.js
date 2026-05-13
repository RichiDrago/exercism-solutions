/// <reference path="./global.d.ts" />
// @ts-check

import { NotAvailable } from "./errors";

export class TranslationService {
  /**
   * Creates a new service
   * @param {ExternalApi} api the original api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   * Attempts to retrieve the translation for the given text.
   *
   * - Returns whichever translation can be retrieved, regardless the quality
   * - Forwards any error from the translation api
   *
   * @param {string} text
   * @returns {Promise<string>}
   */
  free(text) {
    return this.api.fetch(text).then((result) => result.translation);
  }

  /**
   * Batch translates the given texts using the free service.
   *
   * - Resolves all the translations (in the same order), if they all succeed
   * - Rejects with the first error that is encountered
   * - Rejects with a BatchIsEmpty error if no texts are given
   *
   * @param {string[]} texts
   * @returns {Promise<string[]>}
   */
  batch(texts) {
    return new Promise((resolve, reject) => {
      if (texts.length === 0) {
        return reject(new BatchIsEmpty());
      }

      /** @type {string[]} */
      const results = [];
      let completed = 0;

      texts.forEach((text, index) => {
        this.api
          .fetch(text)
          .then((res) => {
            results[index] = res.translation;
            completed++;

            if (completed === texts.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }

  /**
   * Requests the service for some text to be translated.
   *
   * Note: the request service is flaky, and it may take up to three times for
   *       it to accept the request.
   *
   * @param {string} text
   * @returns {Promise<void>}
   */
  request(text) {
    const makeRequest = () =>
      new Promise((resolve, reject) => {
        this.api.request(text, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(undefined);
          }
        });
      });

    return new Promise((resolve, reject) => {
      let attempts = 0;

      const tryRequest = () => {
        attempts++;

        makeRequest()
          .then(resolve)
          .catch((err) => {
            if (attempts < 3) {
              tryRequest();
            } else {
              reject(err);
            }
          });
      };

      tryRequest();
    });
  }

  /**
   * Retrieves the translation for the given text
   *
   * - Rejects with an error if the quality can not be met
   * - Requests a translation if the translation is not available, then retries
   *
   * @param {string} text
   * @param {number} minimumQuality
   * @returns {Promise<string>}
   */
  premium(text, minimumQuality) {
    const getTranslation = () =>
      this.api.fetch(text).then((res) => {
        if (res.quality < minimumQuality) {
          throw new QualityThresholdNotMet(text);
        }
        return res.translation;
      });

    const makeRequest = () =>
      new Promise((resolve, reject) => {
        this.api.request(text, (err) => {
          if (err) reject(err);
          else resolve(undefined);
        });
      });

    return getTranslation().catch((err) => {
      if (err instanceof NotAvailable) {
        return makeRequest().then(() => getTranslation());
      }

      throw err;
    });
  }
}

/**
 * This error is used to indicate a translation was found, but its quality does
 * not meet a certain threshold. Do not change the name of this error.
 */
export class QualityThresholdNotMet extends Error {
  /**
   * @param {string} text
   */
  constructor(text) {
    super(
      `
The translation of ${text} does not meet the requested quality threshold.
    `.trim(),
    );

    this.text = text;
  }
}

/**
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
export class BatchIsEmpty extends Error {
  constructor() {
    super(
      `
Requested a batch translation, but there are no texts in the batch.
    `.trim(),
    );
  }
}
