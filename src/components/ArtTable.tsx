import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface ArtData {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const ArtTable: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtData[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [selectedIds, setSelectedIds] = useState<{ [id: number]: boolean }>({});

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.artic.edu/api/v1/artworks", {
        params: {
          page,
          limit: pageSize,
          fields: "id,title,place_of_origin,artist_display,inscriptions,date_start,date_end"
        }
      });
      setArtworks(res.data.data);
      setTotalRecords(res.data.pagination.total);
    } catch (e) {
      setArtworks([]);
      setTotalRecords(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1, rows);
  }, [rows]);

  const onPageChange = (event: any) => {
    setRows(event.rows);
    setFirst(event.first);
    const newPage = Math.floor(event.first / event.rows) + 1;
    fetchData(newPage, event.rows);
  };

  const selection = artworks.filter(artwork => selectedIds[artwork.id]);

  const onSelectionChange = (e: any) => {
    const currentPageIds = artworks.map(a => a.id);
    const selectedOnPage = e.value.map((item: ArtData) => item.id);
    
    setSelectedIds(prev => {
      const updated = { ...prev };
      currentPageIds.forEach(id => {
        if (selectedOnPage.includes(id)) {
          updated[id] = true;
        } else {
          delete updated[id];
        }
      });
      return updated;
    });
  };

  const renderSelectionSummary = () => {
    const count = Object.values(selectedIds).filter(Boolean).length;
    return (
      <div style={{ margin: "1em 0" }}>
        <span>{count} items selected</span>
        {count > 0 && (
          <button onClick={() => setSelectedIds({})} style={{ marginLeft: "1em" }}>
            Clear All
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="art-table-container">
      {renderSelectionSummary()}
      <DataTable
        value={artworks}
        lazy
        paginator
        rows={rows}
        totalRecords={totalRecords}
        dataKey="id"
        onPage={onPageChange}
        loading={loading}
        first={first}
        scrollable
        scrollHeight="calc(100vh - 120px)"
        selection={selection}
        onSelectionChange={onSelectionChange}
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
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
