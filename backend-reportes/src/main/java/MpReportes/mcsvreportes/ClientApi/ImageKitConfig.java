package MpReportes.mcsvreportes.ClientApi;


import io.imagekit.sdk.ImageKit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ImageKitConfig {
    @Value("${imagekit.PublicKey}")
    private String publicKey;

    @Value("${imagekit.PrivateKey}")
    private String privateKey;

    @Value("${imagekit.UrlEndpoint}")
    private String urlEndpoint;

    @Bean
    public ImageKit imageKit() {
        ImageKit imageKit = ImageKit.getInstance();
        imageKit.setConfig(
                new io.imagekit.sdk.config.Configuration(
                        publicKey,
                        privateKey,
                        urlEndpoint
                )
        );
        return imageKit;
    }
}
