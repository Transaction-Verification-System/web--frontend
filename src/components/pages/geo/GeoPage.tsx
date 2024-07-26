import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import RootTemplate from "@/components/templates/root/RootTemplate";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

const FRAUD_URL = import.meta.env.VITE_API_URL + "/insights/fraud/";
const AML_URL = import.meta.env.VITE_API_URL + "/insights/aml/";

const GeoPage: React.FC = () => {
  // Fetch fraud data
  const { data: fraudData, isLoading: isFraudLoading } = useQuery({
    queryKey: ["fraudLocations"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "location/");
      return response.data;
    },
  });

  // Fetch AML data
  const { data: amlData, isLoading: isAmlLoading } = useQuery({
    queryKey: ["amlLocations"],
    queryFn: async () => {
      const response = await axiosInstance.get(AML_URL + "location/");
      return response.data;
    },
  });

  useEffect(() => {
    if (!isFraudLoading && !isAmlLoading) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPS_API_KEY;

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.5, 40],
        zoom: 1,
      });

      map.addControl(new mapboxgl.NavigationControl());

      // Function to create and add a marker with a popup
      const createMarker = (coord, color, id) => {
        new mapboxgl.Marker({ color })
          .setLngLat([coord.longitude, coord.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // Popup options
              .setText(`ID: ${id}`)
          )
          .addTo(map);
      };

      // Combine fraud and AML coordinates and add markers with different colors
      fraudData?.forEach((item) => {
        createMarker(item, 'red', item.id);
      });

      amlData?.forEach((item) => {
        createMarker(item, 'green', item.id);
      });
    }
  }, [fraudData, amlData, isFraudLoading, isAmlLoading]);

  if (isFraudLoading || isAmlLoading) {
    return <p>Loading...</p>;
  }

  const fraudCount = fraudData?.length || 0;
  const amlCount = amlData?.length || 0;

  return (
    <RootTemplate>
      <div id="map" className=" flex map min-w-screen h-[650px] mb-4"></div>
      <div className="flex gap-10 legend text-center my-4">
        <p>
          <span style={{ color: 'red' }}>●</span> Fraud Locations (Red Pins)
        </p>
        <p>
          <span style={{ color: 'green' }}>●</span> AML Risk Locations (Green Pins)
        </p>
      </div>
      <div className="flex gap-10 count-info text-center">
        <p>Fraud Locations: {fraudCount}</p>
        <p>AML Locations: {amlCount}</p>
      </div>
    </RootTemplate>
  );
};

export default GeoPage;
