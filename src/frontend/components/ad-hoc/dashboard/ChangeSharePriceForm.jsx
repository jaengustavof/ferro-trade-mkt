import { useForm } from "react-hook-form"
import { useState } from "react";
import useIsOwner from "../../../hooks/useIsOwner";
import { useContext } from 'react';
import { GlobalContext } from "../../../context/GlobalContext";

const ChangeSharePriceForm = () => {

  const { marketplace, priceRanges, setPriceRanges } = useContext(GlobalContext);
  const isOwner = useIsOwner();
  const { register, handleSubmit, formState: { errors }, reset  } = useForm();

  const onSubmit = async (data) => {
    
    try {
          // Convertir los valores del formulario a números
          const newPrice1 = parseInt(data.price0, 10);
          const newPrice2 = parseInt(data.price1, 10);
          const newPrice3 = parseInt(data.price2, 10);
          const newPrice4 = parseInt(data.price3, 10);
          const newPrice5 = parseInt(data.price4, 10);

          // Asegurarse de que todos los valores son válidos números
          if (
              isNaN(newPrice1) || isNaN(newPrice2) ||
              isNaN(newPrice3) || isNaN(newPrice4) ||
              isNaN(newPrice5)
          ) {
              throw new Error("Todos los precios deben ser valores numéricos válidos.");
          }

          // Llamar a la función del contrato inteligente para actualizar los precios
          const tx = await marketplace.setRangePrices(
              newPrice1,
              newPrice2,
              newPrice3,
              newPrice4,
              newPrice5
          );

          await tx.wait(); // Esperar a que la transacción sea confirmada

          // Actualizar los valores de priceRanges en el estado del contexto
          setPriceRanges([
              { min: 1, max: 4, price: newPrice1 },
              { min: 5, max: 9, price: newPrice2 },
              { min: 10, max: 14, price: newPrice3 },
              { min: 15, max: 19, price: newPrice4 },
              { min: 20, max: 25, price: newPrice5 }
          ]);
          reset(); // Limpiar el formulario
          alert('Precios actualizados correctamente.');
    } catch (error) {
        console.error("Error al actualizar los precios de las acciones:", error);
        alert("Hubo un error al actualizar los precios.");
    }
  };
  return (
    <div className="change-share-prices__form-container">
        {isOwner ? 
        <>
            <h1 className="form-heading">Precio de acciones</h1>
            <p className="form-text">Completa todos los campos para modificar el <span className="">precio de las acciones</span></p>
            <div className="form-header">
                <p className="form-header__title">Rango</p>
                <p className="form-header__title">Precio</p>
                <p className="form-header__title last">Nuevo precio</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="price-form">
              {
                priceRanges.map((range, index) => (
                  <div className="form-group" key={index}>
                    <p className="form-info">{range.min} a {range.max}</p>
                    <p className="form-info">€ {range.price}</p>
                    <div className="form-input-container">
                      <input 
                      type="number" 
                      id="price" 
                      placeholder="nuevo precio" 
                      {...register(`price${index}`, { required: true })} 
                      />
                      {errors[`price${index}`] && <span className="error-message">Ingrese un valor</span>}
                    </div>
                  </div>
                ))
              }
              <input type="submit" value="Actualizar Valores" className="submit-button" />
            </form>
        </> : 
        <h1 className="form-heading">No tienes permisos para ingresar en esta sección</h1>}
    </div>
  )
}

export default ChangeSharePriceForm