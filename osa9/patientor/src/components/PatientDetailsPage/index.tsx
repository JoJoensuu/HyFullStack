import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';

interface RouteParams extends Record<string, string> {
    id: string;
}


const PatientDetailsPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [patient, setPatient] = useState<Patient | null>(null);

    const renderGenderIcon = (gender: string) => {
        switch (gender) {
          case 'male':
            return <MaleIcon />;
          case 'female':
            return <FemaleIcon />;
          case 'other':
          default:
            return <TransgenderIcon />;
        }
      };
  
    useEffect(() => {
        if (id) {
          const fetchPatient = async () => {
            try {
              const patientData = await patientService.getSingle(id);
              setPatient(patientData);
            } catch (error) {
              console.error('Error fetching patient:', error);
            }
          };
          fetchPatient();
        }
      }, [id]);
    
      if (!patient) {
        return <div>Loading patient details...</div>;
      }

const renderEntry = (entry: Entry) => (
    <div key={entry.id}>
        <p>{entry.date} <i>{entry.description}</i></p>
        {entry.diagnosisCodes && (
            <ul>
                {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                ))}
            </ul>
        )}
    </div>
);
  
    return (
      <div>
        <h2>{patient.name} {renderGenderIcon(patient.gender)}</h2>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <h2>entries</h2>
        {patient.entries.map((entry) => renderEntry(entry))}
      </div>
    );
  };
  
  export default PatientDetailsPage;