// src/contexts/CandidateContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../../api'; // Adjust the path as needed
import { toast } from 'react-toastify'; // Import toast for notifications

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users initially
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serverUrl}allUser`);
        const data = response.data;

        const formattedData = data.map((item) => ({
          name: item.name,
          email: item.email,
          profile: 'View Profile',
          isInvited: item.isInvited || false, // New flag
          isCandidate: item.isCandidate || false,
          banPeriod: item.isBanned ? `Banned until ${item.bannedUntil || 'unknown'}` : 'Not Banned',
          id: item._id,
          // ... include other necessary fields
        }));

        setCandidates(formattedData);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        toast.error('Failed to fetch candidates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Function to toggle contestant status
  const toggleContestantStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(`${serverUrl}toggleIsCandidate/${id}`, {
        isCandidate: !currentStatus,
      });
      if (response.data.message === 'isCandidate toggled') {
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === id ? { ...candidate, isCandidate: !currentStatus } : candidate
          )
        );
        toast.success(`Contestant status ${!currentStatus ? 'enabled' : 'disabled'} successfully.`);
      } else {
        toast.error('Failed to update contestant status.');
      }
    } catch (error) {
      console.error('Error toggling contestant status:', error);
      toast.error('Error toggling contestant status.');
    } finally {
      setLoading(false);
    }
  };

  // Function to invite a candidate
  const inviteCandidate = async (name, email) => {
    try {
      setLoading(true);
      const response = await axios.post(`${serverUrl}invite`, {
        name,
        email,
      });
      // Corrected access to the API response
      const newCandidate = {
        name,
        email,
        profile: 'View Profile',
        isInvited: true,
        isCandidate: false,
        banPeriod: 'Not Banned',
        id: response.data.invitation._id, // Corrected path
        // ... include other necessary fields
      };
      setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
      // Removed duplicate success toast to avoid multiple notifications
      // toast.success(`Invitation sent successfully to ${name}!`);
    } catch (error) {
      console.error('Error inviting candidate:', error);
      toast.error('Error inviting candidate.');
      throw error; // Re-throw to allow component to handle if needed
    } finally {
      setLoading(false);
    }
  };

  // Function to update ban period
  const updateBanPeriod = (id, banData) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              banPeriod: `Banned until ${banData.bannedUntil ? new Date(banData.bannedUntil).toLocaleDateString('en-US') : 'unknown'}`,
              isBanned: banData.isBanned,
              bannedUntil: banData.bannedUntil,
            }
          : candidate
      )
    );
    toast.success('Ban period updated successfully.');
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        loading,
        toggleContestantStatus,
        inviteCandidate,
        updateBanPeriod,
        // ... include other functions or state as needed
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

