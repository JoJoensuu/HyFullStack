import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Entry, Diagnosis } from '../../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';

interface RouteParams extends Record<string, string> {
    id: string;
}


const PatientDetailsPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const fetchedDiagnoses = await diagnosisService.getAll();
                setDiagnoses(fetchedDiagnoses);
            } catch (error) {
                console.error('Error fetching diagnoses:', error);
            }
        };
        fetchDiagnoses();
    }, []);
    
    if (!patient) {
        return <div>Loading patient details...</div>;
    }

    const renderEntry = (entry: Entry) => (
        <div key={entry.id}>
            <p>{entry.date} <i>{entry.description}</i></p>
            {entry.diagnosisCodes && (
                <ul>
                    {entry.diagnosisCodes.map((code) => (
                        <li key={code}>
                            {code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

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
