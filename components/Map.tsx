
import React, { useEffect, useRef } from 'react';
import { Flight, Drone } from '../types';

declare var L: any;

interface MapProps {
  flights: Flight[];
  drones: Drone[];
}

export const Map: React.FC<MapProps> = ({ flights, drones }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const clusterGroup = useRef<any>(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      // Initialize map
      const map = L.map(mapContainer.current, {
          center: [20, 0],
          zoom: 2,
          attributionControl: false,
          zoomControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20
      }).addTo(map);
      
      L.control.attribution({position: 'bottomright'}).addTo(map);

      mapInstance.current = map;
    }
  }, []); // Run only once on mount to initialize map

  useEffect(() => {
    if (mapInstance.current && flights.length > 0) {
      const map = mapInstance.current;
      
      // Clear previous cluster group if it exists
      if (clusterGroup.current) {
        clusterGroup.current.clearLayers();
        map.removeLayer(clusterGroup.current);
      }

      const markers = L.markerClusterGroup({
        iconCreateFunction: function(cluster: any) {
          const count = cluster.getChildCount();
          const size = 48;
          return L.divIcon({
            html: `<div class="cluster-icon" style="width: ${size}px; height: ${size}px; font-size: 14px;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 18px; height: 18px; margin-right: 4px;">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        <span>${count}</span>
                   </div>`,
            className: 'marker-cluster-custom',
            iconSize: L.point(size, size, true),
          });
        },
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
      });

      const droneIcon = L.divIcon({
        html: `
          <div class="pulse"></div>
          <div class="pin-body">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
          <div class="pin-pointer"></div>
        `,
        className: 'custom-map-marker',
        iconSize: [32, 44],
        iconAnchor: [16, 44],
      });
      
      const sortedFlights = [...flights].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      sortedFlights.forEach(flight => {
        const drone = drones.find(d => d.id === flight.droneId);
        const popupContent = `
          <div class="flight-popup-content">
            ${drone?.imageUrl ? `<img src="${drone.imageUrl}" alt="${drone.name}" class="popup-image">` : ''}
            <h3>${flight.location}</h3>
            <div>
              <p><strong>Drone:</strong> ${drone?.name || 'Unknown'}</p>
              <p><strong>Duration:</strong> ${flight.duration} mins</p>
              ${flight.notes ? `<p><strong>Notes:</strong> ${flight.notes}</p>` : ''}
            </div>
          </div>
        `;
        
        const marker = L.marker([flight.coords.lat, flight.coords.lng], { icon: droneIcon })
          .bindPopup(popupContent);
        
        markers.addLayer(marker);
      });

      map.addLayer(markers);
      
      const mostRecentFlight = sortedFlights[0];
      if (mostRecentFlight) {
        map.setView([mostRecentFlight.coords.lat, mostRecentFlight.coords.lng], 5);
      } else if (markers.getLayers().length > 0) {
        map.fitBounds(markers.getBounds().pad(0.3));
      }
      
      clusterGroup.current = markers;
    }
  }, [flights, drones]); // Rerun when flights or drones change

  return <div ref={mapContainer} className="w-full h-full z-0" />;
};