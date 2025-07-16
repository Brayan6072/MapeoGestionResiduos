package MpReportes.mcsvreportes.Services;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImgService {

    private final ImageKit imageKit;

    public ImgService(ImageKit imageKit) {
        this.imageKit = imageKit;
    }

    public Result uploadImage(MultipartFile file, String fileName) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        FileCreateRequest fileCreateRequest = new FileCreateRequest(file.getBytes(), fileName);


        return imageKit.upload(fileCreateRequest);
    }
    public Result deleteImage(String fileId) throws ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        return imageKit.deleteFile(fileId);
    }
}
