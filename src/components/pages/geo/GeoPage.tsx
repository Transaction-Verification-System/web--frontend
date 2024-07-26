import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import RootTemplate from "@/components/templates/root/RootTemplate";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

const FRAUD_URL = import.meta.env.VITE_API_URL + "/insights/fraud/";
const AML_URL = import.meta.env.VITE_API_URL + "/insights/aml/";

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
}

const GeoPage: React.FC = () => {
  const [, setPopupInfo] = useState<LocationData | null>(null);
  const navigate = useNavigate();

  // Fetch fraud data
  const { data: fraudData, isLoading: isFraudLoading } = useQuery<
    LocationData[]
  >({
    queryKey: ["fraudLocations"],
    queryFn: async () => {
      const response = await axiosInstance.get(FRAUD_URL + "location/");
      return response.data;
    },
  });

  // Fetch AML data
  const { data: amlData, isLoading: isAmlLoading } = useQuery<LocationData[]>({
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
        zoom: 2,
      });

      map.addControl(new mapboxgl.NavigationControl());

      const createMarker = (location: LocationData) => {
        const markerElement = document.createElement("div");
        markerElement.className = "marker";
        markerElement.style.backgroundImage =
          "url('https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png')";
        markerElement.style.backgroundSize = "cover";
        markerElement.style.width = "30px";
        markerElement.style.height = "30px";
        markerElement.style.cursor = "pointer";

        const popupElement = document.createElement("div");
        popupElement.className = "mapbox-popup";

        ReactDOM.render(
          <div className="flex flex-col gap-3 w-56 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <p className="text-gray-700">
              <strong>ID:</strong> {location.id}
            </p>
            <p className="text-gray-700">
              <strong>Latitude:</strong> {location.latitude}
            </p>
            <p className="text-gray-700">
              <strong>Longitude:</strong> {location.longitude}
            </p>
            <Button
              onClick={() =>
                navigate(`/logs/failed-transactions/${location.id}`)
              }
            >
              View Details
            </Button>
          </div>,
          popupElement
        );

        new mapboxgl.Marker(markerElement)
          .setLngLat([location.longitude, location.latitude])
          .addTo(map)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupElement)
          );

        markerElement.addEventListener("click", () => {
          setPopupInfo(location);
        });
      };

      fraudData?.forEach((item) => {
        createMarker(item);
      });

      amlData?.forEach((item) => {
        createMarker(item);
      });
    }
  }, [fraudData, amlData, isFraudLoading, isAmlLoading, navigate]);

  const fraudCount = fraudData?.length || 0;
  const amlCount = amlData?.length || 0;

  return (
    <RootTemplate>
      <div id="map" className="flex map min-w-screen h-[650px] mb-4"></div>

      <div className="flex gap-10 legend text-center my-4">
        <p>
          <span style={{ color: "blue" }}>●</span> Fraud Locations (Blue Pins)
        </p>
        <p>
          <span style={{ color: "green" }}>●</span> AML Risk Locations (Green
          Pins)
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
