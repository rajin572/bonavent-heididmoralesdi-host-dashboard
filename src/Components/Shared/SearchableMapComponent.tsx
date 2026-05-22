/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { getGoogleMapsApiKey } from "../../helpers/config/envConfig";

export interface Location {
  lat: number | null;
  lng: number | null;
  address: string | null;
}

interface Props {
  location: Location;
  setLocation: (data: Location) => void;
}

export default function SearchableMapComponent({
  location,
  setLocation,
}: Props) {
  const apiKey = getGoogleMapsApiKey();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  // -----------------------------
  // ✅ LOAD GOOGLE MAPS SCRIPT
  // -----------------------------
  useEffect(() => {
    if (window.google?.maps) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => setScriptLoaded(true);

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [apiKey]);

  // -----------------------------
  // ✅ INIT MAP + AUTOCOMPLETE
  // -----------------------------
  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;

    const center = {
      lat: location.lat ?? 23.8103, // Dhaka default
      lng: location.lng ?? 90.4125,
    };

    // INIT MAP (once only)
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
      });
    }

    // INIT MARKER
    if (!markerInstanceRef.current) {
      markerInstanceRef.current = new google.maps.Marker({
        map: mapInstanceRef.current,
        position: center,
        draggable: true,
      });

      markerInstanceRef.current.addListener("dragend", () => {
        const pos = markerInstanceRef.current?.getPosition();
        if (!pos) return;

        handleLocationUpdate(pos.lat(), pos.lng());
      });
    }

    // -----------------------------
    // 🔍 AUTOCOMPLETE SETUP
    // -----------------------------
    if (searchRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        searchRef.current,
        {
          fields: ["geometry", "formatted_address"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        handleLocationUpdate(lat, lng, place.formatted_address!);
      });
    }

    // -----------------------------
    // 🗺 CLICK TO SELECT
    // -----------------------------
    mapInstanceRef.current.addListener("click", (e: any) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      handleLocationUpdate(lat, lng);
    });

    return () => {
      if (markerInstanceRef.current) {
        markerInstanceRef.current.setMap(null);
        markerInstanceRef.current = null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (mapRef.current) mapRef.current.innerHTML = "";
      mapInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded]);

  // -----------------------------
  // 🌍 UPDATE LOCATION + ADDRESS
  // -----------------------------
  const handleLocationUpdate = (lat: number, lng: number, addr?: string) => {
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (res, status) => {
      const address =
        addr ||
        (status === "OK" && res && res[0] ? res[0].formatted_address : "");

      setLocation({
        lat,
        lng,
        address,
      });

      markerInstanceRef.current?.setPosition({ lat, lng });
      mapInstanceRef.current?.panTo({ lat, lng });

      if (searchRef.current) searchRef.current.value = address || "";
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={searchRef}
        className="p-2 border rounded !text-base-color !border-base-color"
        placeholder="Search location..."
        defaultValue={location.address || ""}
      />

      <div className="w-full h-96 rounded overflow-hidden">
        <div ref={mapRef} className="w-full h-full bg-gray-200" />
      </div>
    </div>
  );
}
