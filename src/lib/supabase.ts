import { createClient } from '@supabase/supabase-js';

// Supabase configuration
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key'
};

// Create Supabase client
export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

// Function URLs for edge functions
export const edgeFunctions = {
  submitLead: `${supabaseConfig.url}/functions/v1/submit-lead`,
  setupTable: `${supabaseConfig.url}/functions/v1/setup-leads-table`
};

// Fallback storage for development
export const fallbackStorage = {
  storeKey: 'automatizaia_leads',
  
  saveLead: (leadData: any) => {
    try {
      const existingLeads = JSON.parse(localStorage.getItem(fallbackStorage.storeKey) || '[]');
      const newLead = {
        ...leadData,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      existingLeads.push(newLead);
      localStorage.setItem(fallbackStorage.storeKey, JSON.stringify(existingLeads));
      return newLead;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw error;
    }
  },
  
  getLeads: () => {
    try {
      return JSON.parse(localStorage.getItem(fallbackStorage.storeKey) || '[]');
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }
};

// Enhanced lead submission with multiple strategies
export const submitLead = async (leadData: any) => {
  console.log('Intentando enviar lead:', leadData);
  
  // Strategy 1: Try direct Supabase connection (if available)
  try {
    const response = await fetch(edgeFunctions.submitLead, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ leadData })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Lead enviado exitosamente a Supabase:', result);
      return result;
    } else {
      throw new Error(`Error del servidor: ${response.status}`);
    }
  } catch (supabaseError) {
    console.warn('Supabase no disponible, usando almacenamiento local:', supabaseError.message);
    
    // Strategy 2: Fallback to localStorage
    const savedLead = fallbackStorage.saveLead(leadData);
    console.log('Lead guardado localmente:', savedLead);
    
    // Simulate API response
    return {
      success: true,
      data: savedLead,
      message: 'Lead guardado exitosamente (modo local)',
      fallback: true
    };
  }
};