package com.emp_man.ems.Service;

import com.emp_man.ems.Models.Attendance;
import com.emp_man.ems.Models.User;
import com.emp_man.ems.Repositories.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final AuthService authService;

    public AttendanceService(AttendanceRepository attendanceRepository, AuthService authService) {
        this.attendanceRepository = attendanceRepository;
        this.authService = authService;
    }

    public List<Attendance> getAllAttendances() {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return attendanceRepository.findAll();
        }
        return attendanceRepository.findByUserId(user.getId());
    }

    public Attendance getAttendanceById(Long id) {
        User user = authService.getCurrentUser();
        if (user.getRole().equals("HR Administrator")) {
            return attendanceRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Attendance not found"));
        }
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));
        if (!attendance.getUser().getId().equals(user.getId())) {
            throw new IllegalAccessError("Unauthorized access to attendance record");
        }
        return attendance;
    }

    public Attendance createAttendance(Attendance attendance) {
        User user = authService.getCurrentUser();
        attendance.setUser(user);
        return attendanceRepository.save(attendance);
    }

    public Attendance updateAttendance(Long id, Attendance attendanceDetails) {
        Attendance attendance = getAttendanceById(id); // Ensures user owns the record or is admin
        attendance.setUser(attendanceDetails.getUser());
        attendance.setDepartment(attendanceDetails.getDepartment());
        attendance.setDate(attendanceDetails.getDate());
        attendance.setStatus(attendanceDetails.getStatus());
        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {
        Attendance attendance = getAttendanceById(id); // Ensures user owns the record or is admin
        attendanceRepository.delete(attendance);
    }
}