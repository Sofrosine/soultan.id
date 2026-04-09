const CAREER_START = new Date(2020, 1); // February 2020

export function getYearsOfExperience(): number {
    const now = new Date();
    const years = now.getFullYear() - CAREER_START.getFullYear();
    const months = now.getMonth() - CAREER_START.getMonth();
    return months < 0 ? years - 1 : years;
}
