export const getDoctors = (req, res) => {
    const doctors = [
      { name: "Dr. John Doe", specialization: "Cardiologist", experience: "10 years" },
      { name: "Dr. Jane Smith", specialization: "Dermatologist", experience: "8 years" },
      { name: "Dr. Alex Johnson", specialization: "Neurologist", experience: "12 years" }
    ];
    res.status(200).json(doctors);
  };
  