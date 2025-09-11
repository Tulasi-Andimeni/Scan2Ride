// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./styles/Drivers.module.css";
// import DriverCard from "./DriverCard";

// const Drivers = () => {
//   const [drivers, setDrivers] = useState([]);
//   const [deletedDrivers, setDeletedDrivers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingDriver, setEditingDriver] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [imagePreview, setImagePreview] = useState("");
//   const [showDeleted, setShowDeleted] = useState(false);

//   const [newDriver, setNewDriver] = useState({
//     name: "",
//     phoneNumber: "",
//     busNumber: "",
//     experienceYears: "",
//     assignedRoute: "",
//     image: null,
//   });

//   const fetchDrivers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/drivers");
//       const active = res.data.filter(driver => !driver.deleted);
//       const deleted = res.data.filter(driver => driver.deleted);
//       setDrivers(active);
//       setDeletedDrivers(deleted);
//     } catch (err) {
//       console.error("Failed to fetch drivers", err);
//     }
//   };

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this driver?")) return;
//     try {
//       await axios.put(`http://localhost:5000/api/drivers/${id}/delete`);
//       fetchDrivers();
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const handleRestore = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/drivers/${id}/restore`);
//       fetchDrivers();
//     } catch (err) {
//       console.error("Restore failed", err);
//     }
//   };

//   const openEditModal = (driver) => {
//     setEditingDriver(driver);
//     setImagePreview(driver.image);
//     setShowEditModal(true);
//   };

//   const resetEditForm = () => {
//     setEditingDriver(null);
//     setImagePreview("");
//     setShowEditModal(false);
//   };

//   const handleEditSave = async () => {
//     try {
//       const formData = new FormData();
//       Object.entries(editingDriver).forEach(([key, value]) => formData.append(key, value));
//       if (imagePreview instanceof File) formData.append("image", imagePreview);

//       await axios.put(`http://localhost:5000/api/drivers/${editingDriver._id}`, formData);
//       setShowEditModal(false);
//       fetchDrivers();
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   const handleAddDriver = async () => {
//     try {
//       const formData = new FormData();
//       Object.entries(newDriver).forEach(([key, value]) => formData.append(key, value));
//       if (imagePreview instanceof File) formData.append("image", imagePreview);

//       await axios.post("http://localhost:5000/api/drivers", formData);
//       setShowAddModal(false);
//       setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
//       setImagePreview("");
//       fetchDrivers();
//     } catch (err) {
//       console.error("Add failed", err);
//     }
//   };

//   const resetForm = () => {
//     setShowAddModal(false);
//     setImagePreview("");
//     setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
//   };

//   const handleImageChange = (e, isEdit = false) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImagePreview(file);
//     if (isEdit) setEditingDriver({ ...editingDriver, image: file });
//     else setNewDriver({ ...newDriver, image: file });
//   };

//   const filteredDrivers = (showDeleted ? deletedDrivers : drivers).filter(driver =>
//     driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     driver.phoneNumber.includes(searchTerm) ||
//     driver.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading} >Drivers List</h1>
//       <div className={styles.headingLine}></div>

//       <input
//         type="text"
//         placeholder="Search by name, phone, or bus number"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className={styles.searchInput}
//       />

//       <div className={styles.toggleContainer}>
//         <button
//           className={`${styles.toggleBtn} ${!showDeleted ? styles.activeToggle : ''}`}
//           onClick={() => setShowDeleted(false)}>Active Drivers </button>
//         <button
//           className={`${styles.toggleBtn} ${showDeleted ? styles.activeToggle : ''}`}
//           onClick={() => setShowDeleted(true)}
//         >
//           Deleted Drivers ({deletedDrivers.length})
//         </button>
//       </div>

//       <div className={styles.grid}>
//         {filteredDrivers.map((driver) => (
//           <DriverCard
//             key={driver._id}
//             driver={{ ...driver, img: driver.image?.startsWith("http") ? driver.image : `http://localhost:5000${driver.image}` }}
//             showDeleted={showDeleted}
//             onDelete={() => handleDelete(driver._id)}
//             onRestore={() => handleRestore(driver._id)}
//             onEdit={() => openEditModal(driver)}
//           />
//         ))}

//         {!showDeleted && (
//           <div className={styles.card} onClick={() => setShowAddModal(true)}>
//             <div className={styles.plusCard}>➕</div>
//           </div>
//         )}
//       </div>

//       {/* Add Modal */}
//       {showAddModal && (
//         <div className={styles.modalOverlay} onClick={resetForm}>
//           <div className={styles.modal} onClick={e => e.stopPropagation()}>
//             <h3>Add New Driver</h3>
//             {imagePreview && <div className={styles.imagePreview}><img src={URL.createObjectURL(imagePreview)} alt="Preview" /></div>}
//             <input type="text" placeholder="Name" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
//             <input type="tel" placeholder="Phone" value={newDriver.phoneNumber} onChange={e => setNewDriver({ ...newDriver, phoneNumber: e.target.value })} />
//             <input type="text" placeholder="Bus No" value={newDriver.busNumber} onChange={e => setNewDriver({ ...newDriver, busNumber: e.target.value })} />
//             <input type="number" placeholder="Experience (years)" value={newDriver.experienceYears} onChange={e => setNewDriver({ ...newDriver, experienceYears: e.target.value })} />
//             <input type="text" placeholder="Assigned Route" value={newDriver.assignedRoute} onChange={e => setNewDriver({ ...newDriver, assignedRoute: e.target.value })} />
//             <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
//             <div className={styles.modalActions}>
//               <button onClick={handleAddDriver}>Save</button>
//               <button onClick={resetForm}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className={styles.modalOverlay} onClick={resetEditForm}>
//           <div className={styles.modal} onClick={e => e.stopPropagation()}>
//             <h3>Edit Driver</h3>
//             {imagePreview && <div className={styles.imagePreview}><img src={imagePreview instanceof File ? URL.createObjectURL(imagePreview) : imagePreview} alt="Preview" /></div>}
//             <input type="text" placeholder="Name" value={editingDriver?.name || ''} onChange={e => setEditingDriver({ ...editingDriver, name: e.target.value })} />
//             <input type="tel" placeholder="Phone" value={editingDriver?.phoneNumber || ''} onChange={e => setEditingDriver({ ...editingDriver, phoneNumber: e.target.value })} />
//             <input type="text" placeholder="Bus No" value={editingDriver?.busNumber || ''} onChange={e => setEditingDriver({ ...editingDriver, busNumber: e.target.value })} />
//             <input type="number" placeholder="Experience (years)" value={editingDriver?.experienceYears || ''} onChange={e => setEditingDriver({ ...editingDriver, experienceYears: e.target.value })} />
//             <input type="text" placeholder="Assigned Route" value={editingDriver?.assignedRoute || ''} onChange={e => setEditingDriver({ ...editingDriver, assignedRoute: e.target.value })} />
//             <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
//             <div className={styles.modalActions}>
//               <button onClick={handleEditSave}>Update</button>
//               <button onClick={resetEditForm}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drivers;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./config";  // make sure path is correct
import styles from "./styles/Drivers.module.css";
import DriverCard from "./DriverCard";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [deletedDrivers, setDeletedDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDriver, setEditingDriver] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const [newDriver, setNewDriver] = useState({
    name: "",
    phoneNumber: "",
    busNumber: "",
    experienceYears: "",
    assignedRoute: "",
    image: null,
  });

  // Fetch drivers from backend
  const fetchDrivers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/drivers`);
      const active = res.data.filter(driver => !driver.deleted);
      const deleted = res.data.filter(driver => driver.deleted);
      setDrivers(active);
      setDeletedDrivers(deleted);
    } catch (err) {
      console.error("Failed to fetch drivers", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Delete driver
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axios.put(`${BASE_URL}/api/drivers/${id}/delete`);
      fetchDrivers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Restore driver
  const handleRestore = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/drivers/${id}/restore`);
      fetchDrivers();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  // Open edit modal
  const openEditModal = (driver) => {
    setEditingDriver(driver);
    setImagePreview(driver.image?.startsWith("http") ? driver.image : `${BASE_URL}${driver.image}`);
    setShowEditModal(true);
  };

  // Reset edit form
  const resetEditForm = () => {
    setEditingDriver(null);
    setImagePreview("");
    setShowEditModal(false);
  };

  // Save edited driver
  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(editingDriver).forEach(([key, value]) => formData.append(key, value));
      if (imagePreview instanceof File) formData.append("image", imagePreview);

      await axios.put(`${BASE_URL}/api/drivers/${editingDriver._id}`, formData);
      setShowEditModal(false);
      fetchDrivers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Add new driver
  const handleAddDriver = async () => {
    try {
      const formData = new FormData();
      Object.entries(newDriver).forEach(([key, value]) => formData.append(key, value));
      if (imagePreview instanceof File) formData.append("image", imagePreview);

      await axios.post(`${BASE_URL}/api/drivers`, formData);
      setShowAddModal(false);
      setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
      setImagePreview("");
      fetchDrivers();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  // Reset add form
  const resetForm = () => {
    setShowAddModal(false);
    setImagePreview("");
    setNewDriver({ name: "", phoneNumber: "", busNumber: "", experienceYears: "", assignedRoute: "", image: null });
  };

  // Handle image change
  const handleImageChange = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(file);
    if (isEdit) setEditingDriver({ ...editingDriver, image: file });
    else setNewDriver({ ...newDriver, image: file });
  };

  // Filter drivers based on search
  const filteredDrivers = (showDeleted ? deletedDrivers : drivers).filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phoneNumber.includes(searchTerm) ||
    driver.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (imagePreview instanceof File) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Drivers List</h1>
      <div className={styles.headingLine}></div>

      <input
        type="text"
        placeholder="Search by name, phone, or bus number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.toggleContainer}>
        <button
          className={`${styles.toggleBtn} ${!showDeleted ? styles.activeToggle : ''}`}
          onClick={() => setShowDeleted(false)}>Active Drivers</button>
        <button
          className={`${styles.toggleBtn} ${showDeleted ? styles.activeToggle : ''}`}
          onClick={() => setShowDeleted(true)}
        >
          Deleted Drivers ({deletedDrivers.length})
        </button>
      </div>

      <div className={styles.grid}>
        {filteredDrivers.map((driver) => (
          <DriverCard
            key={driver._id}
            driver={{ ...driver, img: driver.image?.startsWith("http") ? driver.image : `${BASE_URL}${driver.image}` }}
            showDeleted={showDeleted}
            onDelete={() => handleDelete(driver._id)}
            onRestore={() => handleRestore(driver._id)}
            onEdit={() => openEditModal(driver)}
          />
        ))}

        {!showDeleted && (
          <div className={styles.card} onClick={() => setShowAddModal(true)}>
            <div className={styles.plusCard}>➕</div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={resetForm}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Add New Driver</h3>
            {imagePreview && <div className={styles.imagePreview}><img src={URL.createObjectURL(imagePreview)} alt="Preview" /></div>}
            <input type="text" placeholder="Name" value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} />
            <input type="tel" placeholder="Phone" value={newDriver.phoneNumber} onChange={e => setNewDriver({ ...newDriver, phoneNumber: e.target.value })} />
            <input type="text" placeholder="Bus No" value={newDriver.busNumber} onChange={e => setNewDriver({ ...newDriver, busNumber: e.target.value })} />
            <input type="number" placeholder="Experience (years)" value={newDriver.experienceYears} onChange={e => setNewDriver({ ...newDriver, experienceYears: e.target.value })} />
            <input type="text" placeholder="Assigned Route" value={newDriver.assignedRoute} onChange={e => setNewDriver({ ...newDriver, assignedRoute: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
            <div className={styles.modalActions}>
              <button onClick={handleAddDriver}>Save</button>
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay} onClick={resetEditForm}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Edit Driver</h3>
            {imagePreview && <div className={styles.imagePreview}><img src={imagePreview instanceof File ? URL.createObjectURL(imagePreview) : imagePreview} alt="Preview" /></div>}
            <input type="text" placeholder="Name" value={editingDriver?.name || ''} onChange={e => setEditingDriver({ ...editingDriver, name: e.target.value })} />
            <input type="tel" placeholder="Phone" value={editingDriver?.phoneNumber || ''} onChange={e => setEditingDriver({ ...editingDriver, phoneNumber: e.target.value })} />
            <input type="text" placeholder="Bus No" value={editingDriver?.busNumber || ''} onChange={e => setEditingDriver({ ...editingDriver, busNumber: e.target.value })} />
            <input type="number" placeholder="Experience (years)" value={editingDriver?.experienceYears || ''} onChange={e => setEditingDriver({ ...editingDriver, experienceYears: e.target.value })} />
            <input type="text" placeholder="Assigned Route" value={editingDriver?.assignedRoute || ''} onChange={e => setEditingDriver({ ...editingDriver, assignedRoute: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} />
            <div className={styles.modalActions}>
              <button onClick={handleEditSave}>Update</button>
              <button onClick={resetEditForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;
