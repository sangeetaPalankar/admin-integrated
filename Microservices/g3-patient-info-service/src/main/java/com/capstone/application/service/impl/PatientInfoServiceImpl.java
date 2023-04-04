package com.capstone.application.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.application.model.Patient;
import com.capstone.application.repository.PatientInfoRepository;
import com.capstone.application.service.PatientInfoService;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class PatientInfoServiceImpl implements PatientInfoService
{
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(PatientInfoServiceImpl.class);

	
	private PatientInfoRepository patientInfoRepository;
	
	@Autowired
	public PatientInfoServiceImpl(PatientInfoRepository patientInfoRepository) {
		super();
		this.patientInfoRepository = patientInfoRepository;
	}

	@Override
	public List<Patient> findAll() {
		// TODO Auto-generated method stub
		try {
			log.info("Fetched patient list successfully");
		return patientInfoRepository.findAll();
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Optional<Patient> findById(Integer patientId) {
		// TODO Auto-generated method stub
		try {
			log.info("Patient fetched by patientId");
		return patientInfoRepository.findById(patientId);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Patient update(Patient patient) {
		// TODO Auto-generated method stub
		try {
			log.info("Patient Updated successfully");
		Patient updateResponse = patientInfoRepository.save(patient);
        return updateResponse;
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}
	
	//Sangeeta
		@Override
		public long countPatient() {
			return patientInfoRepository.count();
		}
	

}
