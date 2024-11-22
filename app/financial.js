const taxIdTypes = [
    "EIN (US)",        // Employer Identification Number
    "SSN (US)",        // Social Security Number
    "ITIN (US)",       // Individual Taxpayer Identification Number
    "UTR (UK)",        // Unique Taxpayer Reference
    "SIN (Canada)",    // Social Insurance Number
    "PAN (India)",     // Permanent Account Number
    "GSTIN (India)",   // Goods and Services Tax Identification Number
    "TFN (Australia)", // Tax File Number
    "ABN (Australia)", // Australian Business Number
    "Steuer-ID (Germany)", // Tax Identification Number
    "NIF (Spain)",     // Número de Identificación Fiscal
    "CPF (Brazil)",    // Cadastro de Pessoas Físicas
    "CNPJ (Brazil)",   // Cadastro Nacional da Pessoa Jurídica
    "RFC (Mexico)",    // Registro Federal de Contribuyentes
    "VAT (Various)",   // Value Added Tax Identification Number
    "TIN (International)", // Taxpayer Identification Number
    "KRA PIN (Kenya)", // Kenya Revenue Authority Personal Identification Number
    "TRN (Jamaica)",   // Taxpayer Registration Number
    "ID No. (Various)" // National Identification Number
];

const incomeSources = [
    "Employment Income",
    "Investments",
    "Inheritance",
    "Business Income",
    "Savings",
    "Family"
  ];

export { taxIdTypes, incomeSources };
