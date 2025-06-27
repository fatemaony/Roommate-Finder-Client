import React, { useState, useContext, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaLinkedin, FaGithub, FaTwitter, FaBriefcase,
  FaGraduationCap, FaCalendarAlt, FaGlobe 
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    linkedin: '',
    github: '',
    twitter: '',
    website: '',
    profilePicture: '',
    jobTitle: '',
    company: '',
    education: '',
    skills: [],
    joinDate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'profiles', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const profileData = docSnap.data();
            setProfile(profileData);
          } else {
            // Initialize with user data from auth
            const initialProfile = {
              name: user.displayName || '',
              email: user.email || '',
              phone: '',
              location: '',
              bio: '',
              linkedin: '',
              github: '',
              twitter: '',
              website: '',
              profilePicture: user.photoURL || '',
              jobTitle: '',
              company: '',
              education: '',
              skills: [],
              joinDate: new Date(user.metadata.creationTime).toLocaleDateString() || ''
            };
            setProfile(initialProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthRequiredMessage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                {profile.profilePicture ? (
                  <img 
                    src={profile.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-5xl text-gray-500" />
                )}
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{profile.name || user.displayName || 'Your Profile'}</h1>
                {profile.jobTitle && (
                  <p className="text-xl text-blue-100 mt-1">{profile.jobTitle}</p>
                )}
                {profile.company && (
                  <p className="text-blue-100">{profile.company}</p>
                )}
                <p className="text-blue-100 mt-2">{profile.email || user.email}</p>
                
                {/* Join Date */}
                {profile.joinDate && (
                  <div className="flex items-center justify-center md:justify-start mt-3 text-blue-100 text-sm">
                    <FaCalendarAlt className="mr-2" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-600">
              {profile.bio || 'Tell us about yourself, your professional background, and your interests.'}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Contact Information</h3>
              <div className="space-y-4">
                <ContactInfoItem 
                  icon={<FaEnvelope className="text-blue-500" />} 
                  label="Email" 
                  value={profile.email || user.email} 
                />
                <ContactInfoItem 
                  icon={<FaPhone className="text-blue-500" />} 
                  label="Phone" 
                  value={profile.phone || 'Not provided'} 
                />
                <ContactInfoItem 
                  icon={<FaMapMarkerAlt className="text-blue-500" />} 
                  label="Location" 
                  value={profile.location || 'Not provided'} 
                />
                {profile.website && (
                  <ContactInfoItem 
                    icon={<FaGlobe className="text-blue-500" />} 
                    label="Website" 
                    value={
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {profile.website}
                      </a>
                    } 
                  />
                )}
              </div>
            </div>

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Social Profiles</h3>
              <div className="space-y-3">
                {profile.linkedin && (
                  <SocialLink 
                    icon={<FaLinkedin className="text-blue-700" />} 
                    url={`https://linkedin.com/in/${profile.linkedin}`} 
                    label="LinkedIn" 
                  />
                )}
                {profile.github && (
                  <SocialLink 
                    icon={<FaGithub className="text-gray-800" />} 
                    url={`https://github.com/${profile.github}`} 
                    label="GitHub" 
                  />
                )}
                {profile.twitter && (
                  <SocialLink 
                    icon={<FaTwitter className="text-blue-400" />} 
                    url={`https://twitter.com/${profile.twitter}`} 
                    label="Twitter" 
                  />
                )}
                {!profile.linkedin && !profile.github && !profile.twitter && (
                  <p className="text-gray-500 text-sm">No social links added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Professional Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Work Experience */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Work Experience</h3>
              {profile.jobTitle || profile.company ? (
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaBriefcase className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{profile.jobTitle || 'Your Position'}</h4>
                    <p className="text-gray-600">{profile.company || 'Company Name'}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {profile.joinDate && `Since ${profile.joinDate}`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No work experience added yet</p>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Education</h3>
              {profile.education ? (
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <FaGraduationCap className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{profile.education}</h4>
                    <p className="text-gray-500 text-sm mt-1">Degree or Institution</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No education information added yet</p>
              )}
            </div>

            {/* Additional Sections can be added here */}
            {/* For example: Projects, Certifications, Publications, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ContactInfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="mt-1 mr-3">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-700 text-sm">{label}</h4>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

const SocialLink = ({ icon, url, label }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
  >
    <div className="mr-3">{icon}</div>
    <span>{label}</span>
  </a>
);

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading profile...</p>
    </div>
  </div>
);

const AuthRequiredMessage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Please sign in to view your profile</h2>
      <p className="text-gray-600">You need to be authenticated to access this page.</p>
    </div>
  </div>
);

export default MyProfile;