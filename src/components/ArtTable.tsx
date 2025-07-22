import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const ITEMS_PER_PAGE = 12;

const ArtTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<Record<number, boolean>>({});

  // Derive selected artworks based on ID map
  const selectedArtworks = artworks.filter(art => selectedArtworkIds[art.id]);

  const fetchArtworks = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://api.artic.edu/api/v1/artworks", {
        params: {
          page,
          limit,
          fields: "id,title,place_of_origin,artist_display,inscriptions,date_start,date_end"
        }
      });

      setArtworks(response.data.data);
      setTotalRecords(response.data.pagination.total);
    } catch (err) {
      console.error("Error fetching artwork data:", err);
      setError("Failed to load artwork data. Please try again.");
      setArtworks([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialPage = 1;
    fetchArtworks(initialPage, ITEMS_PER_PAGE);
  }, [fetchArtworks]);

  const handlePageChange = (event: any) => {
    const newPage = Math.floor(event.first / event.rows) + 1;
    setPageStartIndex(event.first);
    fetchArtworks(newPage, event.rows);
  };

  const handleSelectionChange = (e: any) => {
    const currentPageIds = artworks.map(art => art.id);
    const newlySelectedIds = e.value.map((item: Artwork) => item.id);

    setSelectedArtworkIds(prev => {
      const updated = { ...prev };
      currentPageIds.forEach(id => {
        if (newlySelectedIds.includes(id)) {
          updated[id] = true;
        } else {
          delete updated[id];
        }
      });
      return updated;
    });
  };

  const handleClearSelection = () => {
    setSelectedArtworkIds({});
  };

  const renderSelectionSummary = () => {
    const selectedCount = Object.values(selectedArtworkIds).filter(Boolean).length;
    return (
      <div style={{ margin: "1em 0" }}>
        <span>{selectedCount} item{selectedCount !== 1 ? "s" : ""} selected</span>
        {selectedCount > 0 && (
          <button onClick={handleClearSelection} style={{ marginLeft: "1em" }}>
            Clear All
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="art-table-container" style={{ padding: "1rem" }}>
      {renderSelectionSummary()}

      {error && <div style={{ color: "red", marginBottom: "1em" }}>{error}</div>}

      <DataTable
        value={artworks}
        lazy
        paginator
        rows={ITEMS_PER_PAGE}
        totalRecords={totalRecords}
        dataKey="id"
        onPage={handlePageChange}
        loading={loading}
        first={pageStartIndex}
        scrollable
        scrollHeight="calc(100vh - 180px)"
        selection={selectedArtworks}
        onSelectionChange={handleSelectionChange}
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="title" header="Title" sortable />
        <Column field="place_of_origin" header="Place of Origin" sortable />
        <Column field="artist_display" header="Artist" sortable />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" sortable />
        <Column field="date_end" header="End Date" sortable />
      </DataTable>
    </div>
  );
};

export default ArtTable;
