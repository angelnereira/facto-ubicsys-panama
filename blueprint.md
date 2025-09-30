# Project Blueprint

## Overview

This document outlines the structure, features, and development plan for the Next.js-based invoicing application.

## Implemented Features

### Core Configuration

*   **General Settings:** Configure company name, RUC, business reason, and default branch/billing point.
*   **Emitter Connection:** Set up and manage the connection to the client's system (API, database, or webhook).
*   **HKA Connection:** Manage credentials for the HKA production environment.

### API Endpoints

*   `/api/config`: Manages general configuration.
*   `/api/emisor`: Handles the connection with the client's system.
*   `/api/hka`: Manages the connection with HKA.
*   `/api/hka/test`: Tests the connection with HKA.

## Development Plan

Based on the provided code snippets, the following is the plan for the current development sprint:

1.  **File and Folder Structure:**
    *   Create the following folders: `app/configuracion`, `app/conexion-emisor`, `app/conexion-hka`, `app/api/config`, `app/api/emisor`, `app/api/hka`, `lib/supabase`, and `types`.
    *   Create the corresponding `page.tsx`, `route.ts`, `client.ts`, and `config.ts` files.

2.  **Type Definitions (`types/config.ts`):**
    *   Define the `ConfiguracionGeneral`, `ConexionEmisor`, and `ConexionHKA` interfaces.

3.  **Supabase Client (`lib/supabase/client.ts`):**
    *   Set up and export the Supabase client.

4.  **UI Components:**
    *   **`app/configuracion/page.tsx`:** Implement the form for general configuration.
    *   **`app/conexion-emisor/page.tsx`:** Create the UI for managing the emitter connection, including dynamic fields based on the connection type.
    *   **`app/conexion-hka/page.tsx`:** Develop the interface for managing HKA production credentials.

5.  **API Routes:**
    *   **`app/api/hka/test/route.ts`:** Implement the test route for the HKA connection.
    *   Create placeholder routes for `config`, `emisor`, and `hka`.

6.  **Dependencies:**
    *   Install `axios` for making HTTP requests.

7.  **Styling:**
    *   Ensure all components are styled using Tailwind CSS for a consistent and modern look.
