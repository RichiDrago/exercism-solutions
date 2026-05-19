export class GradeSchool {
  constructor() {
    /** @type {Record<number, string>} */
    this.classes = {};
  }

  roster() {
    return Object.values(this.classes).flat();
  }

  add(student, grade) {
    const isDuplicate = Object.values(this.classes).some((arr) =>
      arr.includes(student),
    );
    if (isDuplicate) return false;

    if (!this.classes[grade]) {
      this.classes[grade] = [student];
    } else {
      const newStudentIndex = this.classes[grade].findIndex(
        (s) => student <= s,
      );
      this.classes[grade].splice(
        newStudentIndex === -1 ? this.classes[grade].length : newStudentIndex,
        0,
        student,
      );
    }

    return true;
  }

  grade(grade) {
    return this.classes[grade] ?? [];
  }
}
