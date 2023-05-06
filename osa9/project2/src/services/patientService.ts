import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const addPatient = ( entry: NewPatient ): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getPatient,
    getNonSensitivePatients,
    addPatient
};
