import { useState, useEffect } from 'react'
import { Smile, Calendar, Clock, Stethoscope, Heart } from 'lucide-react'

const moods = [
  { emoji: '😊', label: 'Happy', color: '#ffd93d' },
  { emoji: '😢', label: 'Sad', color: '#6bcfff' },
  { emoji: '😠', label: 'Angry', color: '#ff6b6b' },
  { emoji: '😰', label: 'Worried', color: '#c2a3ff' },
  { emoji: '😴', label: 'Tired', color: '#a8dadc' },
  { emoji: '😎', label: 'Cool', color: '#4ecdc4' },
  { emoji: '🤒', label: 'Sick', color: '#ff9999' },
  { emoji: '😌', label: 'Calm', color: '#b5e7a0' },
  { emoji: '😃', label: 'Excited', color: '#ffbe0b' },
]

function App() {
  const [activeTab, setActiveTab] = useState('mood')
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const [moodEntries, setMoodEntries] = useState([])
  const [appointments, setAppointments] = useState([])
  const [reminders, setReminders] = useState([])

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    doctor: ''
  })

  // New reminder form state
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    type: 'medicine'
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('ostome-moods')
    const savedAppointments = localStorage.getItem('ostome-appointments')
    const savedReminders = localStorage.getItem('ostome-reminders')
    
    if (savedMoods) setMoodEntries(JSON.parse(savedMoods))
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments))
    if (savedReminders) setReminders(JSON.parse(savedReminders))
  }, [])

  // Save mood entry
  const saveMoodEntry = () => {
    if (!selectedMood) {
      alert('Please select a mood! 😊')
      return
    }

    const newEntry = {
      id: Date.now(),
      mood: selectedMood,
      date: selectedDate,
      notes: notes,
      timestamp: new Date().toISOString()
    }

    const updatedEntries = [newEntry, ...moodEntries]
    setMoodEntries(updatedEntries)
    localStorage.setItem('ostome-moods', JSON.stringify(updatedEntries))

    // Reset form
    setSelectedMood('')
    setNotes('')
    alert('Mood saved! Great job! 🎉')
  }

  // Delete mood entry
  const deleteMoodEntry = (id) => {
    const updatedEntries = moodEntries.filter(entry => entry.id !== id)
    setMoodEntries(updatedEntries)
    localStorage.setItem('ostome-moods', JSON.stringify(updatedEntries))
  }

  // Add appointment
  const addAppointment = () => {
    if (!newAppointment.title || !newAppointment.date) {
      alert('Please fill in appointment details! 📅')
      return
    }

    const appointment = {
      id: Date.now(),
      ...newAppointment
    }

    const updatedAppointments = [appointment, ...appointments]
    setAppointments(updatedAppointments)
    localStorage.setItem('ostome-appointments', JSON.stringify(updatedAppointments))

    setNewAppointment({ title: '', date: '', time: '', doctor: '' })
    alert('Appointment added! 🏥')
  }

  // Delete appointment
  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== id)
    setAppointments(updatedAppointments)
    localStorage.setItem('ostome-appointments', JSON.stringify(updatedAppointments))
  }

  // Add reminder
  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) {
      alert('Please fill in reminder details! ⏰')
      return
    }

    const reminder = {
      id: Date.now(),
      ...newReminder
    }

    const updatedReminders = [reminder, ...reminders]
    setReminders(updatedReminders)
    localStorage.setItem('ostome-reminders', JSON.stringify(updatedReminders))

    setNewReminder({ title: '', time: '', type: 'medicine' })
    alert('Reminder added! 🔔')
  }

  // Delete reminder
  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter(rem => rem.id !== id)
    setReminders(updatedReminders)
    localStorage.setItem('ostome-reminders', JSON.stringify(updatedReminders))
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <h1>OSTO(ME)</h1>
        <p>Track your feelings & share with your doctor! 🌈</p>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          <Smile /> Mood
        </button>
        <button 
          className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Calendar /> History
        </button>
        <button 
          className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <Stethoscope /> Visits
        </button>
        <button 
          className={`nav-tab ${activeTab === 'reminders' ? 'active' : ''}`}
          onClick={() => setActiveTab('reminders')}
        >
          <Clock /> Reminders
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {/* Mood Tab */}
        {activeTab === 'mood' && (
          <div className="mood-selector">
            <h2>How are you feeling today? 💭</h2>
            
            <div className="mood-grid">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  className={`mood-button ${selectedMood === mood.emoji ? 'selected' : ''}`}
                  onClick={() => setSelectedMood(mood.emoji)}
                >
                  <span>{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>

            <div className="date-input">
              <label>📅 Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="notes-input">
              <label>📝 What happened today?</label>
              <textarea 
                placeholder="Tell me about your day..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button className="save-button" onClick={saveMoodEntry}>
              Save My Mood! ✨
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>My Mood History 📖</h2>
            
            {moodEntries.length === 0 ? (
              <div className="empty-state">
                <Heart style={{ width: '80px', height: '80px', opacity: 0.3 }} />
                <h3>No moods yet!</h3>
                <p>Start tracking your feelings to see them here 😊</p>
              </div>
            ) : (
              <div className="entry-list">
                {moodEntries.map((entry) => (
                  <div key={entry.id} className="entry-card">
                    <div className="entry-header">
                      <span className="entry-mood">{entry.mood}</span>
                      <span className="entry-date">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    {entry.notes && (
                      <div className="entry-notes">{entry.notes}</div>
                    )}
                    <button 
                      className="delete-button"
                      onClick={() => deleteMoodEntry(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Doctor Visits 🏥</h2>
            
            <div className="appointment-form">
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Add New Appointment</h3>
              
              <div className="form-group">
                <label>Visit Type:</label>
                <input 
                  type="text"
                  placeholder="e.g., Checkup, Dentist..."
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Doctor's Name:</label>
                <input 
                  type="text"
                  placeholder="Dr. Smith"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Date:</label>
                <input 
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Time:</label>
                <input 
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>

              <button className="add-button" onClick={addAppointment}>
                Add Appointment 📅
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="empty-state">
                <Stethoscope style={{ width: '80px', height: '80px', opacity: 0.3 }} />
                <h3>No appointments yet!</h3>
                <p>Add your doctor visits above 🏥</p>
              </div>
            ) : (
              <div className="entry-list">
                {appointments.map((apt) => (
                  <div key={apt.id} className="entry-card">
                    <h3 style={{ color: '#333', marginBottom: '8px' }}>{apt.title}</h3>
                    {apt.doctor && <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>👨‍⚕️ {apt.doctor}</p>}
                    <p style={{ color: '#6c757d', fontSize: '0.9rem', marginTop: '5px' }}>
                      📅 {new Date(apt.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                      {apt.time && ` at ${apt.time}`}
                    </p>
                    <button 
                      className="delete-button"
                      onClick={() => deleteAppointment(apt.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>My Reminders ⏰</h2>
            
            <div className="appointment-form">
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Add New Reminder</h3>
              
              <div className="form-group">
                <label>What to remember:</label>
                <input 
                  type="text"
                  placeholder="e.g., Take medicine"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Type:</label>
                <select 
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                >
                  <option value="medicine">💊 Medicine</option>
                  <option value="exercise">🏃 Exercise</option>
                  <option value="water">💧 Drink Water</option>
                  <option value="other">📌 Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Time:</label>
                <input 
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                />
              </div>

              <button className="add-button" onClick={addReminder}>
                Add Reminder 🔔
              </button>
            </div>

            {reminders.length === 0 ? (
              <div className="empty-state">
                <Clock style={{ width: '80px', height: '80px', opacity: 0.3 }} />
                <h3>No reminders yet!</h3>
                <p>Add reminders to help you remember important things ⏰</p>
              </div>
            ) : (
              <div className="entry-list">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="entry-card">
                    <h3 style={{ color: '#333', marginBottom: '8px' }}>
                      {reminder.type === 'medicine' && '💊 '}
                      {reminder.type === 'exercise' && '🏃 '}
                      {reminder.type === 'water' && '💧 '}
                      {reminder.type === 'other' && '📌 '}
                      {reminder.title}
                    </h3>
                    <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                      ⏰ {reminder.time}
                    </p>
                    <button 
                      className="delete-button"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
