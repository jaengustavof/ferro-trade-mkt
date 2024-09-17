import { useState, useEffect } from "react";
import DashMenu from "../components/ad-hoc/dashboard/DashMenu";
import NftList from "../components/ad-hoc/dashboard/NftList";
import ChangeSharePrice from "../components/ad-hoc/dashboard/ChangeSharePrice";
import { Create } from "../components/ad-hoc/dashboard/Create";

export const DashBoard = () => {
  const [selectedSection, setSelectedSection] = useState("nftList");

  const sections = {
    nftList: <NftList />,
    changePrice: <ChangeSharePrice />,
    createNFT: <Create />
  };

  return (
    <>
        <DashMenu setSelectedSection={setSelectedSection} />
        <div className="dashboard-content">
          {sections[selectedSection] || <NftList />} {/* Renderiza la sección seleccionada */}
        </div>
    </>

  )
}
