package MpReportes.mcsvreportes.Controllers;

import MpReportes.mcsvreportes.Services.ImgService;
import io.imagekit.sdk.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/img")
@CrossOrigin(value = "*")
public class ControllerImg {

    private final ImgService imgService;

    public ControllerImg(ImgService imgService) {
        this.imgService = imgService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImg(@RequestPart("file") MultipartFile file, @RequestPart("fileName") String fileName) throws IOException, ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        return ResponseEntity.ok(imgService.uploadImage(file,fileName));
    }

    @DeleteMapping("/delecte/{id}")
    public ResponseEntity<?> deleteImg(@PathVariable String id) throws ForbiddenException, TooManyRequestsException, InternalServerException, UnauthorizedException, BadRequestException, UnknownException {
        return ResponseEntity.ok(imgService.deleteImage(id));
    }
}
