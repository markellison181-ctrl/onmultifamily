'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Transaction {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  price: number
  suites: number
  capRate: number | null
  status: string
  image?: string
}

function createMarkerIcon(color: string, size: number = 12) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export default function MapRenderer({
  transactions,
  statusColors,
  onSelect,
}: {
  transactions: Transaction[]
  statusColors: Record<string, string>
  onSelect: (t: Transaction) => void
}) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const map = L.map(mapRef.current, {
      center: [44.0, -79.5], // Ontario center
      zoom: 7,
      zoomControl: true,
      attributionControl: false,
    })

    // Clean, minimal tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    // Attribution (small)
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© OpenStreetMap · CARTO')
      .addTo(map)

    mapInstance.current = map
    markersRef.current = L.layerGroup().addTo(map)

    return () => {
      map.remove()
      mapInstance.current = null
    }
  }, [])

  // Update markers
  useEffect(() => {
    if (!mapInstance.current || !markersRef.current) return

    markersRef.current.clearLayers()

    transactions.forEach(t => {
      const color = statusColors[t.status] || '#002B49'
      const size = t.status === 'Sold' ? 10 : 14
      const marker = L.marker([t.lat, t.lng], { icon: createMarkerIcon(color, size) })

      marker.on('click', () => onSelect(t))
      markersRef.current!.addLayer(marker)
    })

    // Fit bounds if transactions exist
    if (transactions.length > 0) {
      const bounds = L.latLngBounds(transactions.map(t => [t.lat, t.lng] as [number, number]))
      mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
    }
  }, [transactions, statusColors, onSelect])

  return <div ref={mapRef} className="w-full h-full" />
}
