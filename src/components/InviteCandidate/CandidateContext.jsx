// src/contexts/CandidateContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../../api'; // Adjust the path as needed
import { toast } from 'react-toastify'; // Import toast for notifications

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [managedCandidates, setManagedCandidates] = useState([]);
  const [invitedCandidates, setInvitedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to format ban period
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Banned';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  // Fetch managed candidates and invited candidates initially
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);

        // Fetch managed candidates from allUser API
        const usersResponse = await axios.get(`${serverUrl}allUser`);
        const users = usersResponse.data;

        // Fetch invited candidates from getInvitations API
        const invitationsResponse = await axios.get(`${serverUrl}getInvitations`);
        let invitations = invitationsResponse.data;

        // Handle different response structures
        if (invitations.invitations && Array.isArray(invitations.invitations)) {
          invitations = invitations.invitations;
        } else if (!Array.isArray(invitations)) {
          throw new TypeError('Invitations data is not an array.');
        }

        // Map managed candidates (only those not marked as isCandidate)
        const mappedManagedCandidates = users
          .filter(user => !user.isCandidate)
          .map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            profile: 'View Profile',
            isCandidate: user.isCandidate || false, // Should be false after filter
            isBanned: user.isBanned || false,
            bannedUntil: user.bannedUntil || null,
            banPeriod: user.isBanned
              ? `Banned until ${user.bannedUntil ? formatDate(user.bannedUntil) : 'unknown'}`
              : 'Not Banned',
            // ... include other necessary fields
          }));

        setManagedCandidates(mappedManagedCandidates);

        // Map invited candidates
        const mappedInvitedCandidates = invitations.map((invitation) => ({
          id: invitation.invitationToken, // Using invitationToken as unique ID
          name: invitation.name,
          email: invitation.email,
          profile: 'View Profile',
          status: invitation.status, // "Pending" or "Accepted"
          tokenExpires: invitation.tokenExpires,
          isCandidate: invitation.status === 'Accepted',
          isBanned: invitation.isBanned || false,
          bannedUntil: invitation.bannedUntil || null,
          banPeriod: invitation.isBanned
            ? `Banned until ${invitation.bannedUntil ? formatDate(invitation.bannedUntil) : 'unknown'}`
            : 'Not Banned',
          // ... include other necessary fields
        }));

        // Include managed candidates who are already contestants (isCandidate: true)
        const acceptedManagedCandidates = users
          .filter(user => user.isCandidate)
          .map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            profile: 'View Profile',
            status: 'Accepted',
            tokenExpires: user.bannedUntil, // Assuming no tokenExpires for managed candidates
            isCandidate: user.isCandidate,
            isBanned: user.isBanned || false,
            bannedUntil: user.bannedUntil || null,
            banPeriod: user.isBanned
              ? `Banned until ${user.bannedUntil ? formatDate(user.bannedUntil) : 'unknown'}`
              : 'Not Banned',
          }));

        setInvitedCandidates([...mappedInvitedCandidates, ...acceptedManagedCandidates]);
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
  const toggleContestantStatus = async (id, currentStatus, fromInvited = false) => {
    try {
      setLoading(true);

      let response;

      if (fromInvited) {
        // Candidate is in invitedCandidates
        response = await axios.put(`${serverUrl}toggleIsCandidate/${id}`, {
          isCandidate: !currentStatus,
        });
        window.location.reload()
      } else {
        // Candidate is in managedCandidates
        response = await axios.put(`${serverUrl}toggleIsCandidate/${id}`, {
          isCandidate: !currentStatus,
        });
      }

      if (response.status === 200 && response.data.message === 'isCandidate toggled') {
        // Toggle was successful, update state based on toggle direction
        if (!fromInvited) {
          // Toggling from managedCandidates
          if (!currentStatus) {
            // Toggled on: Move to invitedCandidates as "Accepted"
            const candidateToMove = managedCandidates.find((c) => c.id === id);
            if (candidateToMove) {
              setManagedCandidates((prev) => prev.filter((c) => c.id !== id));
              setInvitedCandidates((prev) => [
                ...prev,
                {
                  id: candidateToMove.id,
                  name: candidateToMove.name,
                  email: candidateToMove.email,
                  profile: candidateToMove.profile,
                  status: 'Accepted',
                  isCandidate: true,
                  isBanned: candidateToMove.isBanned,
                  bannedUntil: candidateToMove.bannedUntil,
                  banPeriod: candidateToMove.banPeriod,
                },
              ]);
            }
          } else {
            // Toggled off: Remove from invitedCandidates and add back to managedCandidates
            const candidateToMove = invitedCandidates.find((c) => c.id === id && c.status === 'Accepted');
            if (candidateToMove) {
              setInvitedCandidates((prev) => prev.filter((c) => c.id !== id));
              setManagedCandidates((prev) => [
                ...prev,
                {
                  id: candidateToMove.id,
                  name: candidateToMove.name,
                  email: candidateToMove.email,
                  profile: candidateToMove.profile,
                  isCandidate: false,
                  isBanned: candidateToMove.isBanned,
                  bannedUntil: candidateToMove.bannedUntil,
                  banPeriod: candidateToMove.banPeriod,
                },
              ]);
            }
          }
        } else {
          // Toggling from invitedCandidates
          if (!currentStatus) {
            // Toggled off: Update status to "Pending"
            setInvitedCandidates((prev) =>
              prev.map((c) =>
                c.id === id
                  ? { ...c, isCandidate: false, status: 'Pending' }
                  : c
              )
            );
          } else {
            // Toggled on: Update status to "Accepted"
            setInvitedCandidates((prev) =>
              prev.map((c) =>
                c.id === id
                  ? { ...c, isCandidate: true, status: 'Accepted' }
                  : c
              )
            );
          }
        }

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

      // Check if invitation data exists
      if (response.data && response.data.invitation) {
        const invitation = response.data.invitation;
        const newInvitedCandidate = {
          id: invitation.invitationToken, // Ensure a unique identifier
          name,
          email,
          profile: 'View Profile',
          status: 'Pending',
          tokenExpires: invitation.tokenExpires,
          isCandidate: false,
          isBanned: false,
          bannedUntil: null,
          banPeriod: 'Not Banned',
          // ... include other necessary fields
        };
        setInvitedCandidates((prev) => [...prev, newInvitedCandidate]);
        toast.success(`Invitation sent successfully to ${name}!`);
      } else {
        toast.error('Invitation data is missing in the response.');
      }
    } catch (error) {
      console.error('Error inviting candidate:', error);
      throw error; // Re-throw to allow component to handle if needed
    } finally {
      setLoading(false);
    }
  };

  // Function to update ban period
  const updateBanPeriod = (id, banData) => {
    setInvitedCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              banPeriod: `Banned until ${banData.bannedUntil ? formatDate(banData.bannedUntil) : 'unknown'}`,
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
        managedCandidates,
        invitedCandidates,
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
