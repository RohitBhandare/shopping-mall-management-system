import React, { useEffect, useState } from 'react';
import MallService from '../services/MallService';
import { FaArrowLeft, FaArrowRight, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import MallEditModal from './Modals.jsx/MallEditModal';
import MallAddModal from './Modals.jsx/AddMallModal';
import GenerativeAiSearch from './GenerativeAiSearch';
import ReactPaginate from 'react-paginate';

const Malls = () => {
  const [malls, setMalls] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMall, setSelectedMall] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await MallService.getAllMallsWithPaginationAndSorting({
          page: currentPage,
          size: itemsPerPage,
          sortBy: 'id',
          sortOrder: 'asc',
        });
        setMalls(response.content);
        // Update total pages based on the total items and items per page
        const calculatedTotalPages = Math.ceil(response.totalElements / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error('Failed to fetch malls:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCancel = () => {
    setSelectedMall(null);
    setEditModalOpen(false);
  };

  const handleEditClick = (mall) => {
    setSelectedMall(mall);
    setEditModalOpen(true);
  };

  const handleGenerativeAiSearch = async (searchResults) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMalls(searchResults);
    setLoading(false);
    console.log('Generative AI Search Results:', searchResults);
  };

  const handleAddMall = (newMall) => {
    setMalls((prevMalls) => [...prevMalls, newMall]);
    setAddModalOpen(false);
  };

  const handleUpdateMall = (updatedMall) => {
    setMalls((prevMalls) =>
      prevMalls.map((mall) => (mall.id === updatedMall.id ? updatedMall : mall))
    );
    setSelectedMall(null);
  };

  const handleDelete = async (mallId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this mall?');

      if (confirmDelete) {
        await MallService.deleteMall(mallId);
        setMalls((prevMalls) => prevMalls.filter((mall) => mall.id !== mallId));
        setSelectedMall(null);
      }
    } catch (error) {
      console.error('Failed to delete mall:', error.message);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Malls</h2>
      <GenerativeAiSearch onSearch={handleGenerativeAiSearch} />
      {loading && <p>Loading...</p>}
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <FaPlus className="mr-2 text-xl" />
        <span className="hidden sm:inline-block">Add Mall</span>
      </button>
      <table className="bg-gray-600 table-auto w-full cursor-pointer">
        <thead className="bg-gray-700 text-gray-300">
          {malls.length > 0 && (
            <tr>
              {Object.keys(malls[0]).map((key) => (
                <th key={key} className="px-4 py-2 text-left border-b border-gray-500">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
              <th className="px-4 py-2 text-left border-b border-gray-500">Actions</th>
            </tr>
          )}
        </thead>
        <tbody>
          {malls.map((mall) => (
            <tr key={mall.id}>
              {Object.keys(mall).map((key) => (
                <td key={key} className="border px-4 py-2 border-gray-500">
                  {mall[key]}
                </td>
              ))}
              <td
                className="border px-4 py-2 border-gray-500"
                style={{ display: 'flex', alignItems: 'center', fontSize: '30px' }}
              >
                <FaEdit className="text-blue-500 cursor-pointer mr-2" onClick={() => handleEditClick(mall)} />
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(mall.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <div className="mt-4 flex justify-center items-center space-x-4">
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      breakLabel="..."
      onPageChange={handlePageChange}
      containerClassName="pagination flex space-x-2"
      pageClassName="bg-gray-400 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-500 transition-colors duration-300"
      activeClassName="bg-blue-500 text-white"
      previousClassName="bg-gray-500 px-3 py-2 rounded-md cursor-pointer flex items-center hover:bg-gray-600 transition-colors duration-300"
      nextClassName="bg-gray-500 px-3 py-2 rounded-md cursor-pointer flex items-center hover:bg-gray-600 transition-colors duration-300"
      previousLabel={<FaArrowLeft className="text-white" />}
      nextLabel={<FaArrowRight className="text-white" />}
      breakClassName="bg-gray-200 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition-colors duration-300"
    />
  </div>
      {selectedMall && (
        <MallEditModal
          isOpen={editModalOpen}
          onClose={handleCancel}
          mall={selectedMall}
          onUpdate={handleUpdateMall}
        />
      )}
      <MallAddModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddMall} />
    </div>
  );
};

export default Malls;
