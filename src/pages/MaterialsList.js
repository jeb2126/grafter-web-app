import { useState, useEffect } from 'react';
import EditableRow from '../components/forms/EditableRow';
import ReadOnlyRow from '../components/forms/ReadOnlyRow';
import databaseService from '../services/firestore';
import './MaterialList.css';

const MaterialsList = function (props) {
  const [materialName, setMaterialName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [materials, setMaterials] = useState([]);

  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    materialName: '',
    unit: '',
    price: ''
  });

  const [empty, setEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const { jobId } = props;

  // getMaterials - GET request to firestore
  useEffect(() => {
    setIsLoading(true);
    databaseService.getMaterials(jobId).then((materialsInfo) => {
      setMaterials(materialsInfo);
      setIsLoading(false);
      setHasChanged(false);
    });
  }, [hasChanged]);

  useEffect(() => {
    if (materials.length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [materials]);

  let count = 0;

  // eslint-disable-next-line no-unused-vars
  const calculatePrice = materials.forEach((material) => {
    const convertToNum = Number(material.price * material.unit);
    count += convertToNum;
  });

  useEffect(() => {
    setTotalPrice(count.toFixed(2));
  }, [materials]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMaterialName('');
    setUnit('');
    setPrice('');

    // Make POST request to firebase
    databaseService.addMaterial(jobId, materialName, unit, price).then(() => {
      setHasChanged(true);
    });
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormdata = { ...editFormData };
    newFormdata[fieldName] = fieldValue;

    setEditFormData(newFormdata);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedMaterial = {
      materialName: editFormData.materialName,
      unit: editFormData.unit,
      price: editFormData.price,
      id: editMaterialId
    };

    console.log(editedMaterial);

    const newMaterials = [...materials];

    const index = materials.findIndex((material) => material.id === editMaterialId);

    newMaterials[index] = editedMaterial;

    // updateMaterial - PATCH request to firestore
    databaseService.updateMaterial(jobId, editMaterialId, editedMaterial).then(() => {
      setHasChanged(true);
    });
    setEditMaterialId(null);
  };

  const handleEditClick = (e, material) => {
    e.preventDefault();
    setEditMaterialId(material.id);
    console.log(material, 'handleEditClick');

    const formValues = {
      materialName: material.materialName,
      unit: material.unit,
      price: material.price,
      id: material.id
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditMaterialId(null);
  };

  const handleDeleteClick = (materialId) => {
    const newMaterials = [...materials];

    const index = materials.findIndex((material) => material.id === materialId);

    newMaterials.splice(index, 1);

    console.log(materialId, '<<<delete');
    databaseService.deleteMaterial(jobId, materialId).then(() => {
      setHasChanged(true);
    });
  };

  const errorMessage = (
    <tr>
      <th colSpan="4" className="emptyMsg__materialsList">
        Please enter a material
      </th>
    </tr>
  );

  const loadingMessage = <h2>Loading...</h2>;

  if (isLoading) return loadingMessage;

  return (
    <div className="container__MaterialsList">
      <h1>Materials</h1>
      <div className="table__materialsList">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Units</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {empty
                ? errorMessage
                : materials.map((item) =>
                    editMaterialId === item.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        key={item.materialName}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        item={item}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        key={item.materialName}
                      />
                    )
                  )}
            </tbody>
          </table>
        </form>
      </div>

      <div className="calculator__materialsList">
        <p className="totalPrice__materialList">{`Total Price: £${totalPrice}`}</p>
      </div>

      <div className="form__container__materialsList">
        <h2>Add new Materials</h2>

        <form onSubmit={handleSubmit} className="form__materialsList">
          <input
            type="text"
            required
            placeholder="Material name..."
            value={materialName}
            className="formBox__materialsList"
            onChange={(e) => setMaterialName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Units..."
            value={unit}
            className="formBox__materialsList"
            onChange={(e) => setUnit(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price..."
            value={price}
            className="formBox__materialsList"
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="btn__materialList">
            <button type="submit" className="button__materialList">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialsList;
