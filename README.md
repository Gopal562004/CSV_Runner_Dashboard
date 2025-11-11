# CSV Runner Dashboard

A Next.js application for uploading, analyzing, and visualizing running data from CSV files.

## Project Overview

This project implements a CSV Runner Dashboard that allows users to upload CSV files containing running data (date, person, miles run) and view comprehensive visualizations and metrics. The application meets all specified requirements including CSV parsing, validation, data visualization, and metric calculations.

## Features

- **CSV Upload**: Drag & drop or click to upload CSV files
- **Data Validation**: Automatic validation of CSV headers and data types
- **Visualizations**: 
  - Overall running trends chart
  - Individual person running charts
  - Interactive data tables
- **Metrics**: Average, min, max miles (overall and per-person)
- **Responsive Design**: Works on desktop and mobile devices

## Assumptions

1. CSV files must have exactly 3 columns: `date`, `person`, `miles run`
2. Date format must be YYYY-MM-DD
3. Miles must be numeric values (can include decimals)
4. No authentication required - simple file upload interface
5. All data processing happens client-side (no backend required)

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with JavaScript enabled

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gopal562004/CSV_Runner_Dashboard.git
   cd csv-runner-dashboard

