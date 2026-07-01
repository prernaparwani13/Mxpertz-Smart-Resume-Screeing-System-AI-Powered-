import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# A basic predefined list of tech skills for extraction. 
# In a real-world scenario, this could be loaded from a database or use an NLP NER model.
TECH_SKILLS = [
    "python", "java", "c++", "c#", "javascript", "typescript", "ruby", "php", "go", "rust", "swift",
    "react", "angular", "vue", "node.js", "express", "django", "flask", "fastapi", "spring boot",
    "sql", "mysql", "postgresql", "mongodb", "redis", "elasticsearch", "cassandra",
    "docker", "kubernetes", "aws", "azure", "gcp", "terraform", "jenkins", "git", "ci/cd",
    "machine learning", "deep learning", "nlp", "computer vision", "tensorflow", "pytorch", "scikit-learn",
    "pandas", "numpy", "matplotlib", "html", "css", "tailwind", "bootstrap",
    "linux", "bash", "agile", "scrum", "rest api", "graphql"
]

def extract_skills(text: str) -> set:
    """Extract skills from text based on a predefined list."""
    text_lower = text.lower()
    found_skills = set()
    
    # We pad the text to help with boundary matching without complex regex
    padded_text = f" {text_lower.replace(',', ' ').replace('.', ' ').replace('(', ' ').replace(')', ' ').replace('/', ' ')} "
    
    for skill in TECH_SKILLS:
        # Simple boundary matching by adding spaces around the skill, 
        # handling special cases like c++ or c# which don't work well with \b
        if f" {skill} " in padded_text:
            found_skills.add(skill)
            
    return found_skills

def calculate_match_score(job_desc: str, resume_text: str) -> float:
    """Calculate the cosine similarity between job description and resume text using TF-IDF."""
    try:
        # Generate embeddings using TF-IDF
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform([job_desc, resume_text])
        
        # Calculate cosine similarity
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        
        # Convert to a 0-100 percentage scale
        score = max(0, similarity) * 100
        
        # Round to 2 decimal places
        return round(score, 2)
    except Exception as e:
        logger.error(f"Error calculating match score: {e}")
        return 0.0

def analyze_resume(job_desc: str, resume_text: str) -> dict:
    """Perform full analysis of a resume against a job description."""
    
    # 1. Calculate overall semantic similarity
    score = calculate_match_score(job_desc, resume_text)
    
    # 2. Extract skills from both texts
    jd_skills = extract_skills(job_desc)
    resume_skills = extract_skills(resume_text)
    
    # 3. Determine matched and missing skills relative to the Job Description
    matched_skills = list(jd_skills.intersection(resume_skills))
    missing_skills = list(jd_skills.difference(resume_skills))
    
    # 4. Generate a brief AI-style explanation
    explanation = generate_explanation(score, matched_skills, missing_skills)
    
    return {
        "score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "explanation": explanation
    }

def generate_explanation(score: float, matched_skills: list, missing_skills: list) -> str:
    """Generate a 2-3 line explanation of the match."""
    if score >= 75:
        match_level = "strong"
    elif score >= 50:
        match_level = "moderate"
    else:
        match_level = "weak"
        
    explanation = f"The candidate has a {match_level} overall match with the job description ({score}%). "
    
    if matched_skills:
        skills_str = ", ".join(matched_skills[:3]) # Show top 3
        if len(matched_skills) > 3:
            skills_str += " and others"
        explanation += f"They possess key required skills like {skills_str}. "
    else:
        explanation += "They do not appear to have the specific technical skills mentioned in the job description. "
        
    if missing_skills:
        missing_str = ", ".join(missing_skills[:3])
        if len(missing_skills) > 3:
            missing_str += " and others"
        explanation += f"However, they are missing some requested skills such as {missing_str}."
    else:
        explanation += "They appear to meet all the primary technical skill requirements."
        
    return explanation
