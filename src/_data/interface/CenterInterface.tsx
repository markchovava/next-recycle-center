/**
 * Defines the structure for a Service or Business Center.
 * All properties are defined with their expected TypeScript types.
 */
export interface CenterInterface {
    // Identifiers
    id: number;
    userId: number;

    // Contact Information
    name: string;
    phone: string;
    email: string;
    
    // Location Details
    address: string;
    longitude: number;
    latitude: number;
    city: string;
    province: string;
    postalCode: string;

    // Operational Details
    description: string;
    
    // Operating Hours (Time strings, e.g., "09:00")
    weekdayOpenTime: string;
    weekdayCloseTime: string;
    weekendOpenTime: string;
    weekendCloseTime: string;
    holidayOpenTime: string;
    holidayCloseTime: string;

    // Timestamps
    createdAt: string; // Typically a date-time string
    updatedAt: string; // Typically a date-time string
}
