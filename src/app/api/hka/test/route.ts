import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { token_empresa, token_password, url_base } = await req.json();

  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
    <tem:FoliosRestantes>
      <tem:tokenEmpresa>${token_empresa}</tem:tokenEmpresa>
      <tem:tokenPassword>${token_password}</tem:tokenPassword>
    </tem:FoliosRestantes>
  </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const response = await axios.post(url_base, soapEnvelope, {
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': '"http://tempuri.org/IService/FoliosRestantes"',
      },
      timeout: 10000,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Conexión exitosa',
      data: response.data 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
