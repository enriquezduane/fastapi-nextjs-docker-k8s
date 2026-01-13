'use client';
import React, { useState, useEffect } from 'react';
import styles from '../app/page.module.css';

const DataTab = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    joiner_total_count: 0
  });
  const [editingId, setEditingId] = useState(null);

  // 1. READ
  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/trip?limit=50&sort=latest`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'joiner_total_count' ? parseInt(value) || 0 : value
    }));
  };

  // 2. CREATE & 3. UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `${API_URL}/trip/${editingId}` : `${API_URL}/trip`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({ name: '', description: '', joiner_total_count: 0 });
        setEditingId(null);
        fetchTrips(); // Refresh list
      } else {
        alert('Failed to save trip');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 4. DELETE
  const handleDelete = async (id) => {
    if(!confirm('Are you sure?')) return;
    try {
      await fetch(`${API_URL}/trip/${id}`, { method: 'DELETE' });
      fetchTrips();
    } catch (error) {
      console.error(error);
    }
  };

  // Populate Form for Edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      joiner_total_count: item.joiner_total_count
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', joiner_total_count: 0 });
  };

  return (
    <>
      {/* LEFT SIDE: FORM */}
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>{editingId ? 'Edit Trip' : 'Create Trip edited'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Trip name"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description..."
          />

          <label>Joiner Count</label>
          <input
            type="number"
            name="joiner_total_count"
            value={formData.joiner_total_count}
            onChange={handleChange}
          />

          <button type="submit">{editingId ? 'Update' : 'Create'}</button>
          {editingId && (
            <button type="button" onClick={handleCancel} style={{marginLeft: '10px', background: '#ccc', color: '#333'}}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* RIGHT SIDE: LIST */}
      <div className={styles.rightPanel}>
        <h2 className={styles.title}>All Trips</h2>
        {loading ? <p>Loading...</p> : (
          <div>
            {data.map(item => (
              <div key={item.id} className={styles.tripItem}>
                <div className={styles.tripInfo}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <small>Joiners: {item.joiner_total_count}</small>
                </div>
                <div className={styles.actions}>
                  <button className="edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
            {data.length === 0 && <p>No trips found.</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default DataTab;
