import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const GeoPage: React.FC = () => {
  useEffect(() => {
    (mapboxgl).accessToken = import.meta.env.VITE_MAPS_API_KEY;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 7,
    });

    map.addControl(new mapboxgl.NavigationControl());

    const coordinates = [
      { longitude: 85.324, latitude: 27.7172 },
      { longitude: -74.006, latitude: 40.7128 },
      { longitude: 139.6917, latitude: 35.6895 },
    ];

    coordinates.forEach(coord => {
      new mapboxgl.Marker()
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map);
    });
  }, []);

  return <div id="map" className="map w-screen h-screen"></div>;
};

export default GeoPage;
