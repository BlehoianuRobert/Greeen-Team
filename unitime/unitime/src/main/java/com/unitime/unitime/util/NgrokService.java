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
            new ProcessBuilder("ngrok", "http", "8080", "--host-header=localhost", "--log=stdout").start();
            Thread.sleep(4000);

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

            Pattern pattern = Pattern.compile("\"public_url\":\"(https://[^\"]+)\"");
            Matcher matcher = pattern.matcher(json.toString());
            if (matcher.find()) {
                publicUrl = matcher.group(1);
                System.out.println("Ngrok public URL: " + publicUrl);
            } else {
                System.err.println("Failed to extract ngrok public_url.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getPublicUrl() {
        return publicUrl;
    }
}