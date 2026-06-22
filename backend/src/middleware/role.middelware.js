export const recruiterOnly = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      message: "Recruiters only",
    });
  }

  next();
};

export const candidateOnly = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({
      message: "Candidates only",
    });
  }

  next();
};