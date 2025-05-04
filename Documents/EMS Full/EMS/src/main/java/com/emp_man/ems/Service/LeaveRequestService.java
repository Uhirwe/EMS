package com.emp_man.ems.Service;

import com.emp_man.ems.Models.LeaveRequest;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final AuthService authService;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, AuthService authService) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.authService = authService;
    }

    public List<LeaveRequest> getAllLeaveRequests() {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return leaveRequestRepository.findAll();
        }
        return leaveRequestRepository.findByUserId(user.getId());
    }

    public LeaveRequest getLeaveRequestById(Long id) {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return leaveRequestRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Leave request not found"));
        }
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        if (!leaveRequest.getUser().getId().equals(user.getId())) {
            throw new IllegalAccessError("Unauthorized access to leave request");
        }
        return leaveRequest;
    }

    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        User user = authService.getCurrentUser();
        leaveRequest.setUser(user);
        return leaveRequestRepository.save(leaveRequest);
    }

    public LeaveRequest updateLeaveRequest(Long id, LeaveRequest leaveRequestDetails) {
        LeaveRequest leaveRequest = getLeaveRequestById(id); // Ensures user owns the record or is admin
        leaveRequest.setUser(leaveRequestDetails.getUser());
        leaveRequest.setDepartment(leaveRequestDetails.getDepartment());
        leaveRequest.setStartDate(leaveRequestDetails.getStartDate());
        leaveRequest.setEndDate(leaveRequestDetails.getEndDate());
        leaveRequest.setStatus(leaveRequestDetails.getStatus());
        leaveRequest.setReason(leaveRequestDetails.getReason());
        return leaveRequestRepository.save(leaveRequest);
    }

    public void deleteLeaveRequest(Long id) {
        LeaveRequest leaveRequest = getLeaveRequestById(id); // Ensures user owns the record or is admin
        leaveRequestRepository.delete(leaveRequest);
    }
}