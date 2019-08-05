import React, { useState } from 'react';
import AddExerciseForm from './Components/AddExerciseForm';
import ExerciseModal from './Components/ExerciseModal';

export default function App() {

  const daysOfWeekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const initialFormState = { key: '', name: '', weight: '', reps: '', comments: '', day: '' };
  const [targetedExercise, setTargetedExercise] = useState(initialFormState);
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [dayOfWeek, setDayOfWeek] = useState('Sunday');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function addExercise(exercise) {
    setIsEditing(false);
    exercise.key = new Date().getTime();
    setExercises([...exercises, exercise]);
  }

  function removeExercise() {
    setExercises(exercises.filter(exercise => exercise.key !== targetedExercise.key));
    closeModal();
  }

  function saveExercise() {
    setExercises(exercises.map(exercise => (exercise.key === targetedExercise.key ? targetedExercise : exercise)));
    setIsEditing(false);
  }

  function openModal(exercise) {
    setModalIsOpen(true);
    setTargetedExercise(exercise);
  }

  function closeModal() {
    setModalIsOpen(false);
    setTargetedExercise(initialFormState);
    setIsEditing(false);
  }

  return(
    <div>
      <section className="hero is-medium bg-img">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-white">Fitness Tracker</h1>
            <h2 className="subtitle has-text-white">Plan your workout for the week with this handy application. Enter
            the exercise details below to add an exercise to your workout plan. Click on any exercise you've
            added to view details and make changes.</h2>
          </div>
        </div>
      </section>

      <div className="columns section has-background-white-ter">
        <AddExerciseForm 
          addExercise={addExercise}
          isEditing={isEditing}
          daysOfWeekArray={daysOfWeekArray}
        />

        <div className="column"></div>

        <section className="column is-three-fifths box">
          <div className="tabs is-centered is-fullwidth is-boxed">
            <ul>
              {daysOfWeekArray.map( (dayOfWeekArrayItem, index) => (
                <li
                  key={index}
                  className={dayOfWeek === dayOfWeekArrayItem ? "is-active" : null}
                  onClick={() => setDayOfWeek(dayOfWeekArrayItem)}
                >
                  <a>{dayOfWeekArrayItem}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="tags are-large">
            {exercises.map( (exercise, index) => (
              (dayOfWeek === exercise.day) ? (
                <a
                  className="tag is-link"
                  key={exercise.key}
                  onClick={() => openModal(exercise)}
                >
                  {exercise.name}
                </a>
              ) : (
                <></>
              )
            ))}

            <ExerciseModal
              setTargetedExercise={setTargetedExercise}
              targetedExercise={targetedExercise}
              removeExercise={removeExercise}
              saveExercise={saveExercise}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
