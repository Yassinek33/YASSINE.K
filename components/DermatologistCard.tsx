

import React from 'react';
import { DisplayableDermatologist } from './DermatologistListPage'; // Import the interface

interface DermatologistCardProps {
    dermatologist: DisplayableDermatologist;
}

// Assume process.env.REACT_APP_GOOGLE_MAPS_STATIC_API_KEY is available and valid
// This key is separate from the GoogleGenAI API_KEY and would need to be configured
// in your project's environment variables for the Google Maps Static API.
const GOOGLE_MAPS_STATIC_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_STATIC_API_KEY || ''; 

const getStaticMapImageUrl = (lat: number, lng: number, apiKey: string): string => {
    const size = '300x150'; // Adjust size as needed
    const zoom = 15; // Zoom level
    const markerColor = '00B37E'; // Emerald green
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&markers=color:${markerColor}%7C${lat},${lng}&key=${apiKey}`;
    return url;
};

const PhoneIconSVG: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="#0A2840">
        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);

const WebIconSVG: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="#0A2840">
        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5.656 5.656a2 2 0 11-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 005.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5z" clipRule="evenodd" />
    </svg>
);

const EmailIconSVG: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="#0A2840">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const StarIconSVG: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.51c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
);

const DermatologistCard: React.FC<DermatologistCardProps> = ({ dermatologist }) => {
    const { name, address, phone, website, email, uri, lat, lng, reviewSnippets, distance } = dermatologist;

    const formattedPhoneHref = phone ? `tel:${phone.replace(/[^\D]/g, '')}` : '#'; // Keep only digits for tel: link

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300 animate-fade-in flex flex-col h-full">
            {/* Static Map Image */}
            {lat !== undefined && lng !== undefined && GOOGLE_MAPS_STATIC_API_KEY && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 aspect-video flex-shrink-0">
                    <img
                        src={getStaticMapImageUrl(lat, lng, GOOGLE_MAPS_STATIC_API_KEY)}
                        alt={`Localisation de ${name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            {/* Name */}
            <h3 className="text-lg font-semibold text-[#0A2840] mb-1 leading-tight">
                {name}
            </h3>
            
            {/* Address */}
            {address && (
                <p className="text-sm text-gray-600 mb-1 leading-tight">
                    {address}
                </p>
            )}

            {/* Distance (if available) */}
            {distance !== undefined && (
                <p className="text-sm text-gray-500 mb-2 leading-tight">
                    Distance: {distance} km
                </p>
            )}
            
            {/* Phone Number with Icon */}
            {phone && (
                <div className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                    <PhoneIconSVG />
                    <span>{phone}</span>
                </div>
            )}

            {/* Website with Icon */}
            {website && (
                <a 
                    href={website.startsWith('http') ? website : `https://${website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-[#0066CC] flex items-center gap-2 hover:underline mb-1"
                    aria-label={`Visiter le site web de ${name}`}
                >
                    <WebIconSVG />
                    <span>Site web</span>
                </a>
            )}

            {/* Email with Icon */}
            {email && (
                <a 
                    href={`mailto:${email}`} 
                    className="text-sm text-[#0066CC] flex items-center gap-2 hover:underline mb-1"
                    aria-label={`Envoyer un email à ${name}`}
                >
                    <EmailIconSVG />
                    <span>Email</span>
                </a>
            )}

            {/* Reviews */}
            {reviewSnippets && reviewSnippets.length > 0 && (
                <div className="mt-2 text-sm text-gray-700 flex flex-col gap-1">
                    <p className="font-semibold flex items-center gap-1">
                        <StarIconSVG /> Avis:
                    </p>
                    <ul className="list-disc list-inside ml-4 text-xs text-gray-600 space-y-0.5">
                        {reviewSnippets.map((review, idx) => (
                            <li key={idx}>
                                <a 
                                    href={review.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[#0066CC] hover:underline"
                                    title={review.title || `Lire l'avis sur ${name}`}
                                >
                                    {review.title || "Voir l'avis"}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-gray-100 flex-grow justify-start items-end">
                {/* "Appeler" Button */}
                {phone && (
                    <a 
                        href={formattedPhoneHref} 
                        className="flex-grow sm:flex-grow-0 text-center text-sm text-white bg-[#0A2840] px-3 py-1.5 rounded-md hover:bg-[#123456] transition-colors inline-block"
                        aria-label={`Appeler ${name} au ${phone}`}
                    >
                        Appeler
                    </a>
                )}

                {/* "Voir sur Google Maps" Link */}
                {uri && (
                    <a 
                        href={uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-grow sm:flex-grow-0 text-center text-sm text-[#0066CC] border border-[#0066CC] px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors inline-block"
                        aria-label={`Voir ${name} sur Google Maps`}
                    >
                        Voir sur Maps
                    </a>
                )}
            </div>
        </div>
    );
};

export default DermatologistCard;