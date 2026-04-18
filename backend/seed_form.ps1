$loginBody = '{"email":"admin@tridiagonal.com","password":"Admin@123"}';
$loginResp = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody;
$token = $loginResp.token;

$tick = (Get-Date).Ticks

$formBody = @{
  name = "Contact Us"
  slug = "contact-us-$tick"
  adminEmail = "info@tridiagonal.com"
  submitButtonText = "Submit"
  consentText = 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style="color: #00AEEF; text-decoration: underline;">privacy policy</a>'
  fields = @(
    @{ label="First Name*"; name="firstName"; type="text"; required=$true; width="half" },
    @{ label="Last Name*"; name="lastName"; type="text"; required=$true; width="half" },
    @{ label="Email*"; name="email"; type="email"; required=$true; width="half" },
    @{ label="Contact Number*"; name="contactNumber"; type="tel"; required=$true; width="half" },
    @{ label="Job title"; name="jobTitle"; type="text"; required=$false; width="half" },
    @{ label="Company Name*"; name="companyName"; type="text"; required=$true; width="half" },
    @{ label="Industry"; name="industry"; type="select"; required=$false; width="full"; options=@("Oil & Gas","Pharma & Medical Devices","Metals, Mining & Cement","Food, Beverages & CPG","Chemicals & Petrochemicals","Power & Renewables","Others") },
    @{ label="Country"; name="country"; type="select"; required=$false; width="full"; options=@("India","United States","United Arab Emirates","United Kingdom","Germany","Other") },
    @{ label="Services/Technologies"; name="servicesTechnologies"; type="select"; required=$false; width="full"; options=@("CFD","FEA","DEM","FSI","Digital Twin","Flow Assurance Testing","Erosion & Corrosion Testing","Tridiagonal.ai","Partner Solutions") },
    @{ label="Message Box"; name="message"; type="textarea"; required=$false; width="full" }
  )
} | ConvertTo-Json -Depth 10;

$resp = Invoke-RestMethod -Uri "http://localhost:5000/api/forms" -Method POST -ContentType "application/json" -Headers @{ Authorization="Bearer $token" } -Body $formBody;
$resp | ConvertTo-Json -Depth 5

$formId = $resp.data._id

# Fetch current contactpage
$cpResp = Invoke-RestMethod -Uri "http://localhost:5000/api/contactpage" -Headers @{ Authorization="Bearer $token" }
$cpData = $cpResp.data

# Link new form
$cpData.selectedFormId = $formId

$cpBody = $cpData | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5000/api/contactpage" -Method PUT -ContentType "application/json" -Headers @{ Authorization="Bearer $token" } -Body $cpBody;
