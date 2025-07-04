import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  message = '';

  // For form
  isEdit = false;
  editingStudentId: number | null = null;
  student = this.resetStudent();
  resumeFile: File | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  resetStudent() {
    return {
      name: '',
      branch: '',
      cgpa: 0,
      phone: '',
      email: '',
      skills: '',
      backlogs: 0,
      passoutYear: new Date().getFullYear()
    };
  }

  loadStudents() {
    this.studentService.getAll().subscribe(data => this.students = data);
  }

  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    (['name', 'branch', 'cgpa', 'phone', 'email', 'skills', 'backlogs', 'passoutYear'] as const).forEach(key => {
      const value = this.student[key];
formData.append(key, value !== null && value !== undefined ? value.toString() : '');


    });
    if (this.resumeFile) {
      formData.append('Resume', this.resumeFile); // Capital R ✅

    }

    if (this.isEdit && this.editingStudentId !== null) {
      this.studentService.update(this.editingStudentId, formData).subscribe(() => {
        this.message = 'Student updated successfully';
        this.resetForm();
        this.loadStudents();
      });
    } else {
      this.studentService.add(formData).subscribe(() => {
        this.message = 'Student added successfully';
        this.resetForm();
        this.loadStudents();
      });
    }
    console.log("Payload before POST:", this.student);

  }

  edit(student: any) {
    this.isEdit = true;
    this.editingStudentId = student.studentId;
    this.student = { ...student };
    this.resumeFile = null;
  }

  delete(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(studentId).subscribe(() => {
        this.message = 'Student deleted successfully';
        this.loadStudents();
      });
    }
  }

  resetForm() {
    this.student = this.resetStudent();
    this.resumeFile = null;
    this.isEdit = false;
    this.editingStudentId = null;
  }
}
