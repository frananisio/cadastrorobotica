class Student {
    constructor(nome, email, celular, campus) {
      this.nome = nome;
      this.email = email;
      this.celular = celular;
      this.campus = campus;
    }
  }
  
  class StudentManager {
    constructor() {
      this.students = [];
      this.modal = document.getElementById('modal');
      this.modalClose = document.getElementById('modalClose');
      this.form = document.getElementById('form');
      this.nomeInput = document.getElementById('nome');
      this.emailInput = document.getElementById('email');
      this.celularInput = document.getElementById('celular');
      this.campusInput = document.getElementById('campus');
      this.saveButton = document.getElementById('salvar');
      this.cancelButton = document.getElementById('cancelar');
      this.tableBody = document.querySelector('tbody');
  
      this.cadastrarEstudanteButton = document.getElementById('cadastrarEstudante');
      this.editingIndex = -1;
  
      this.modalClose.addEventListener('click', () => this.closeModal());
      this.cancelButton.addEventListener('click', () => this.cancelAction());
      this.saveButton.addEventListener('click', () => this.saveAction());
      this.cadastrarEstudanteButton.addEventListener('click', () => this.openModal());
    }
  
    openModal() {
      this.modal.classList.add('active');
    }
  
    closeModal() {
      this.modal.classList.remove('active');
      this.clearForm();
    }
  
    clearForm() {
      this.nomeInput.value = '';
      this.emailInput.value = '';
      this.celularInput.value = '';
      this.campusInput.value = '';
      this.editingIndex = -1;
    }
  
    saveAction() {
      const nome = this.nomeInput.value;
      const email = this.emailInput.value;
      const celular = this.celularInput.value;
      const campus = this.campusInput.value;
  
      if (nome && email && celular && campus) {
        if (this.editingIndex === -1) {
          const student = new Student(nome, email, celular, campus);
          this.students.push(student);
        } else {
          const editedStudent = this.students[this.editingIndex];
          editedStudent.nome = nome;
          editedStudent.email = email;
          editedStudent.celular = celular;
          editedStudent.campus = campus;
        }
  
        this.closeModal();
        this.renderTable();
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    }
  
    cancelAction() {
      this.closeModal();
    }
  
    editStudent(index) {
      this.editingIndex = index;
      const student = this.students[index];
      this.nomeInput.value = student.nome;
      this.emailInput.value = student.email;
      this.celularInput.value = student.celular;
      this.campusInput.value = student.campus;
      this.openModal();
    }
  
    deleteStudent(index) {
      this.students.splice(index, 1);
      this.renderTable();
    }
  
    renderTable() {
      this.tableBody.innerHTML = '';
  
      this.students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.nome}</td>
          <td>${student.email}</td>
          <td>${student.celular}</td>
          <td>${student.campus}</td>
          <td>
            <button class="button red" onclick="studentManager.deleteStudent(${index})">Excluir</button>
            <button class="button green" onclick="studentManager.editStudent(${index})">Editar</button>
          </td>
        `;
        this.tableBody.appendChild(row);
      });
    }
  }
  
  const studentManager = new StudentManager();  