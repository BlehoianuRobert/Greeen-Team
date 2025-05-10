package com.unitime.unitime.util;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class NgrokService {

    private String publicUrl;

    public NgrokService() {
        try {
            // 1. Start ngrok (non-blocking)
            new ProcessBuilder("ngrok", "http", "8080", "--host-header=localhost", "--log=stdout").start();
            // 2. Wait for ngrok to boot
            Thread.sleep(4000);

            // 3. Call Ngrok API to get tunnel info
            URL apiUrl = new URL("http://localhost:4040/api/tunnels");
            HttpURLConnection conn = (HttpURLConnection) apiUrl.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder json = new StringBuilder();
            String line;
            while ((line = in.readLine()) != null) {
                json.append(line);
            }
            in.close();

            // 4. Extract public URL using regex
            Pattern pattern = Pattern.compile("\"public_url\":\"(https://[^\"]+)\"");
            Matcher matcher = pattern.matcher(json.toString());
            if (matcher.find()) {
                publicUrl = matcher.group(1);
                System.out.println("✅ Ngrok public URL: " + publicUrl);
            } else {
                System.err.println("❌ Failed to extract ngrok public_url.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getPublicUrl() {
        return publicUrl;
    }
}