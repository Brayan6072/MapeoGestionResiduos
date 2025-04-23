package MpReportes.mcsvreportes.Client;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseUserService {
    private final FirebaseAuth firebaseAuth;

    public FirebaseUserService(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    public List<String> getAllUserEmails() throws FirebaseAuthException {
        List<String> emails = new ArrayList<>();
        ListUsersPage page = firebaseAuth.listUsers(null);

        for (UserRecord userRecord : page.iterateAll()) {
            if (userRecord.getEmail() != null) {
                emails.add(userRecord.getEmail());
            }
        }

        return emails;
    }

}
