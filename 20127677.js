const Joi = require('joi');
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.json());

const students =[
   {
      id: '20127677',
      name: 'Ha Tuan Lam'
   },
   {
      id: '20127678',
      name: 'Nguyen Van A'
   },
   {
      id: '20127679',
      name: 'Nguyen Van B'
   }
];

app.get('/',(req, res) => {
   res.send('Hello world');
});

app.get('/api/showAllStudents',(req, res) => {
   res.send(students);
});

app.get('/api/showStudent/:id',(req, res) => {
   const student = students.find(a => a.id === req.params.id);
   if (!student) res.status(404).send('That student does not exist.');
   else res.send(student);
});

app.post('/api/addStudent', (req, res) =>{
   const schema = Joi.object({
      id: Joi.string().regex(/^\d+$/).min(8).max(8).required(),
      name: Joi.string().min(3).required()
   });
   const result = schema.validate(req.body);
   
   if (result.error){
      res.status(400).send(result.error.details[0].message);
      return;
   }

   const newStudent ={
      id: req.body.id,
      name: req.body.name
   };

   students.push(newStudent);
   res.send(students);
})

app.put('/api/changeStudentName/:id', (req, res) =>{
   const student = students.find(a => a.id === req.params.id);
   if (!student) {
      res.status(404).send('That student does not exist.');
      return;
   }

   const schema = Joi.object({
      name: Joi.string().min(3).required()
   });
   const result = schema.validate(req.body);

   if (result.error){
      res.status(400).send(result.error.details[0].message);
      return;
   }
   student.name = req.body.name;
   res.send(students);
})

app.delete('/api/deleteStudent/:id', (req, res) => {
   const student = students.find(a => a.id === req.params.id);
   if (!student) {
      res.status(404).send('That student does not exist.');
      return;
   }

   const pos = students.indexOf(student);
   students.splice(pos,1);
   res.send(students);
})

app.listen(3000, () => console.log("Listening on port 3000..."));