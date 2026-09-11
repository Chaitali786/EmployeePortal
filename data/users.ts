export type  CurrentUser = {
  savedColleagueIds: any;
  username: string;
  password: string;
  name: string;
  role: string;
  department: string;
  joiningDate: string;
  officeLocation: string;
  clientName: string;
  
}

export const MOCK_USERS: CurrentUser[] = [
  {
    savedColleagueIds:"01",
    username: "Chaitali",
    password: "test123",
    name: "Chaitali Deore",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    joiningDate: "2022-03-15",
    officeLocation: "Stockholm HQ",
    clientName: "Nordic Bank Group"
    
  },
  {
    savedColleagueIds:"02",
    username: "Guru",
    name: "Guru Hire ",
    password: "test123",
    role: "Growth Marketing Lead",
    department: "Marketing",
    joiningDate: "2021-08-01",
    officeLocation: "Gothenburg Hub",
    clientName: "Spotify Regional"
    
  },
];