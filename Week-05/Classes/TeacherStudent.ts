class Student {
  learn() {
    console.log('The student is learnign something new');
  }
  question(teacher: Teacher) {
    teacher.answer();
  }
}

class Teacher {
  teach(student: Student) {
    student.learn();
  }
  answer() {
    console.log('The teacher is answering a question');
  }
}

const teacher = new Teacher();
const student = new Student();

teacher.teach(student);
student.question(teacher);
