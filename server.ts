// ==========================================
// KHQR PAYMENT - AUTOMATIC LICENSE ISSUE
// ==========================================

// តម្លៃកញ្ចប់ (ជាដុល្លារ)
const PRICING = {
  starter: 9.99,
  pro: 79.99,
  lifetime: 149.00,
  enterprise: 299.00
};

// ផែនទីប្លង់តាមតម្លៃ
const PLAN_BY_PRICE: Record<number, string> = {
  9.99: 'starter',
  79.99: 'pro',
  149.00: 'lifetime',
  299.00: 'enterprise'
};

// ==========================================
// 1. GENERATE KHQR PAYMENT CODE
// ==========================================
// PaymentCheckout.tsx (Server Route)

// PaymentCheckout.tsx (Server Route)

app.post('/api/payment/checkout', async (req, res) => {
  try {
    const { plan, transactionId, amount, reference, paymentMethod } = req.body;

    // ==========================================
    // 1. VALIDATE INPUT
    // ==========================================
    if (!plan || !transactionId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validPlans = ['starter', 'pro', 'enterprise', 'lifetime'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // ==========================================
    // 2. VERIFY TRANSACTION (Anti-Fraud)
    // ==========================================
    // ពិនិត្យមើលថា Transaction ID មិនទាន់ត្រូវបានប្រើពីមុន
    const existing = await new Promise((resolve, reject) => {
      db.get(
        'SELECT id FROM licenses WHERE metadata LIKE ? AND is_active = 1',
        [`%${transactionId}%`],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });

    if (existing) {
      return res.status(409).json({ error: 'Transaction already used' });
    }

    // ==========================================
    // 3. GENERATE LICENSE KEY (Cryptographic)
    // ==========================================
    const licenseKey = generateLicenseKey(); // Function ដើម

    // ==========================================
    // 4. CALCULATE EXPIRY & DEVICES
    // ==========================================
    let expiresAt: string | null = null;
    let maxDevices: number = 1;

    switch (plan) {
      case 'starter':
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        maxDevices = 1;
        break;
      case 'pro':
        expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        maxDevices = 3;
        break;
      case 'enterprise':
        expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        maxDevices = 10;
        break;
      case 'lifetime':
        expiresAt = null; // Unlimited
        maxDevices = 5;
        break;
      default:
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        maxDevices = 1;
    }

    // ==========================================
    // 5. SAVE TO DATABASE
    // ==========================================
    const metadata = JSON.stringify({
      payment: {
        transactionId,
        amount,
        reference: reference || 'N/A',
        method: paymentMethod || 'KHQR',
        paidAt: new Date().toISOString(),
      },
      plan,
      issuedBy: 'Super Admin',
    });

    db.run(
      `INSERT INTO licenses (license_key, plan, max_devices, expires_at, is_active, metadata)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [licenseKey, plan, maxDevices, expiresAt, 1, metadata],
      function (err) {
        if (err) {
          console.error('License generation error:', err);
          return res.status(500).json({ error: 'Failed to generate license' });
        }

        // ==========================================
        // 6. AUDIT LOG
        // ==========================================
        logAudit(licenseKey, 'payment_success', req.ip, req.headers['user-agent'], {
          transactionId,
          amount,
          plan,
          maxDevices,
          expiresAt,
        });

        // ==========================================
        // 7. SEND EMAIL (ស្រេចចិត្ត)
        // ==========================================
        // sendEmail({
        //   to: customerEmail,
        //   subject: 'Your Angkor Emperor License',
        //   body: `License Key: ${licenseKey}\nPlan: ${plan}\nDevices: ${maxDevices}\nExpires: ${expiresAt || 'Lifetime'}`,
        // });

        // ==========================================
        // 8. RESPONSE
        // ==========================================
        res.json({
          success: true,
          license: {
            key: licenseKey,
            plan,
            maxDevices,
            expiresAt,
            amount,
          },
          message: 'Payment confirmed! License issued successfully!',
        });
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  // ISO 20022 KHQR Payload
  const payload = {
    merchantId,
    merchantName,
    amount: amount,
    currency: 'USD',
    merchantCity: 'Phnom Penh',
    countryCode: 'KH',
    timestamp: new Date().toISOString(),
    reference: `LICENSE-${plan.toUpperCase()}-${Date.now()}`
  };

  const qrData = Buffer.from(JSON.stringify(payload)).toString('base64');

  res.json({
    success: true,
    plan,
    amount,
    currency: 'USD',
    qrData,
    payload,
    // បន្ថែម QR Code SVG ដើម្បីបង្ហាញភ្លាម
    qrImage: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`
  });
});

// ==========================================
// 2. CONFIRM PAYMENT (Webhook / Callback)
// ==========================================
app.post('/api/payment/confirm', (req, res) => {
  const { reference, transactionId, amount, status } = req.body;

  // ក្នុងការអនុវត្តជាក់ស្តែង គួរតែផ្ទៀងផ្ទាត់ជាមួយ API ធនាគារ
  // ប៉ុន្តែសម្រាប់ការសាកល្បង យើងប្រើ Mock
  
  if (status !== 'success' && status !== 'COMPLETED') {
    return res.status(400).json({ error: 'Payment not completed' });
  }

  // កំណត់ប្លង់តាមចំនួនទឹកប្រាក់
  const plan = PLAN_BY_PRICE[amount];
  if (!plan) {
    return res.status(400).json({ error: 'Invalid payment amount' });
  }

  // បង្កើត License Key
  const licenseKey = generateLicenseKey();
  const expiresAt = plan === 'lifetime' 
    ? null 
    : new Date(Date.now() + (plan === 'starter' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString();

  const maxDevices = plan === 'starter' ? 1 : plan === 'pro' ? 3 : plan === 'lifetime' ? 5 : 10;

  db.run(`INSERT INTO licenses (license_key, plan, max_devices, expires_at, is_active, metadata)
          VALUES (?, ?, ?, ?, ?, ?)`,
    [licenseKey, plan, maxDevices, expiresAt, 1, JSON.stringify({ 
      payment: { transactionId, amount, reference, paidAt: new Date().toISOString() }
    })],
    function(err) {
      if (err) {
        console.error('License generation error:', err);
        return res.status(500).json({ error: 'Failed to generate license' });
      }

      logAudit(licenseKey, 'payment_success', req.ip, req.headers['user-agent'], { 
        transactionId, 
        amount, 
        plan 
      });

      res.json({
        success: true,
        license: {
          key: licenseKey,
          plan,
          maxDevices,
          expiresAt,
          amount
        },
        message: 'Payment confirmed! License issued successfully.'
      });
    }
  );
});

// ==========================================
// 3. SIMULATE PAYMENT (សម្រាប់សាកល្បង)
// ==========================================
app.post('/api/payment/simulate', (req, res) => {
  const { plan } = req.body;

  if (!plan || !PRICING[plan as keyof typeof PRICING]) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  const amount = PRICING[plan as keyof typeof PRICING];
  const reference = `SIM-${plan.toUpperCase()}-${Date.now()}`;
  const transactionId = `TXN-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

  // ក្លែងធ្វើការទូទាត់ជោគជ័យ
  setTimeout(() => {
    // ហៅ Webhook Confirm
    fetch(`http://localhost:${PORT}/api/payment/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reference,
        transactionId,
        amount,
        status: 'success'
      })
    }).then(response => response.json())
      .then(data => {
        console.log('Payment confirmed:', data);
      })
      .catch(err => console.error('Webhook error:', err));
  }, 2000);

  res.json({
    success: true,
    message: 'Payment simulation started. License will be issued shortly.',
    reference,
    transactionId,
    amount,
    plan
  });
});

System Context:
${contextData ? JSON.stringify(contextData) : "Standard Super Admin Armor Engine"}
    `.trim();

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "គ្មានការឆ្លើយតបពីប្រព័ន្ធ";
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini AI API Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate AI response.",
      hint: "Please ensure GEMINI_API_KEY is properly set in AI Studio Secrets."
    });
  }
});

// 3. Automated Threat Vulnerability Audit using Gemini
app.post("/api/gemini/audit-threat", async (req, res) => {
  try {
    const { threatDetails } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Analyze this Game Alpha8 / Angkor Armor Threat Vector:
${JSON.stringify(threatDetails, null, 2)}

Provide:
1. Threat Classification & Severity Rating
2. Attack Vector Analysis (e.g., Cheat Engine, DLL Injection, Memory Manipulation, HWID Spoofing, Kernel Hooking)
3. Immediate Automated Countermeasure & Firewall Rule Recommendations
4. Long-term hardening policy for Super Admin

Strict requirement: Output in Khmer language with technical precision. DO NOT use emojis.
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    return res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("Gemini Audit Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze threat vector.",
    });
  }
});

// Vite Middleware / Static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Angkor Emperor Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
