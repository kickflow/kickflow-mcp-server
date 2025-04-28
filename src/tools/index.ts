import getTicketTool from './tickets/get-ticket.js'
import listTicketsTool from './tickets/list-tickets.js'
import listTasksTool from './tickets/list-tasks.js'
import listCategoriesTool from './categories/list-categories.js'
import createCategoryTool from './categories/create-category.js'
import deleteCategoryTool from './categories/delete-category.js'
import updateCategoryTool from './categories/update-category.js'
import listFoldersTool from './folders/list-folders.js'
import createFolderTool from './folders/create-folder.js'
import deleteFolderTool from './folders/delete-folder.js'
import updateFolderTool from './folders/update-folder.js'
import getFolderTool from './folders/get-folder.js'
import listGeneralMastersTool from './general-masters/list-general-masters.js'
import createGeneralMasterTool from './general-masters/create-general-master.js'
import getGeneralMasterTool from './general-masters/get-general-master.js'
import updateGeneralMasterTool from './general-masters/update-general-master.js'
import deleteGeneralMasterTool from './general-masters/delete-general-master.js'
import listGeneralMasterItemsTool from './general-master-items/list-general-master-items.js'
import createGeneralMasterItemTool from './general-master-items/create-general-master-item.js'
import getGeneralMasterItemTool from './general-master-items/get-general-master-item.js'
import updateGeneralMasterItemTool from './general-master-items/update-general-master-item.js'
import deleteGeneralMasterItemTool from './general-master-items/delete-general-master-item.js'
import listGradesTool from './grades/list-grades.js'
import createGradeTool from './grades/create-grade.js'
import getGradeTool from './grades/get-grade.js'
import deleteGradeTool from './grades/delete-grade.js'
import updateGradeTool from './grades/update-grade.js'
import setDefaultGradeTool from './grades/set-default-grade.js'
import listOrganizationChartsTool from './organization-charts/list-organization-charts.js'
import createOrganizationChartTool from './organization-charts/create-organization-chart.js'
import deleteOrganizationChartTool from './organization-charts/delete-organization-chart.js'
import getOrganizationChartTool from './organization-charts/get-organization-chart.js'
import updateOrganizationChartTool from './organization-charts/update-organization-chart.js'
import getCurrentOrganizationChartTool from './organization-charts/get-current-organization-chart.js'
import activateOrganizationChartTool from './organization-charts/activate-organization-chart.js'
import listTeamsTool from './teams/list-teams.js'
import createTeamTool from './teams/create-team.js'
import getTeamTool from './teams/get-team.js'
import updateTeamTool from './teams/update-team.js'
import deleteTeamTool from './teams/delete-team.js'
import listTeamMembersTool from './teams/list-team-members.js'
import createTeamMembersTool from './teams/create-team-members.js'
import deleteTeamMembersTool from './teams/delete-team-members.js'
import updateTeamMemberTool from './teams/update-team-member.js'
import listRolesTool from './roles/list-roles.js'
import createRoleTool from './roles/create-role.js'
import getRoleTool from './roles/get-role.js'
import updateRoleTool from './roles/update-role.js'
import deleteRoleTool from './roles/delete-role.js'
import createRoleMembersTool from './roles/create-role-members.js'
import listRoleMembersTool from './roles/list-role-members.js'
import deleteRoleMemberTool from './roles/delete-role-member.js'
import approveTicketTool from './tickets/approve-ticket.js'
import rejectTicketTool from './tickets/reject-ticket.js'
import denyTicketTool from './tickets/deny-ticket.js'
import withdrawTicketTool from './tickets/withdraw-ticket.js'
import archiveTicketTool from './tickets/archive-ticket.js'
import listTicketLinksTool from './ticket-links/list-ticket-links.js'
import listViewersTool from './viewers/list-viewers.js'
import createViewerTool from './viewers/create-viewer.js'
import deleteViewerTool from './viewers/delete-viewer.js'
import listCommentsTool from './comments/list-comments.js'
import createCommentTool from './comments/create-comment.js'
import getCommentTool from './comments/get-comment.js'
import updateCommentTool from './comments/update-comment.js'
import deleteCommentTool from './comments/delete-comment.js'
import getCurrentUserTool from './users/get-current-user.js'
import listUsersTool from './users/list-users.js'
import createUserTool from './users/create-user.js'
import getUserTool from './users/get-user.js'
import deleteUserTool from './users/delete-user.js'
import updateUserTool from './users/update-user.js'
import lookupUserByEmailTool from './users/lookup-user-by-email.js'
import reinviteUserTool from './users/reinvite-user.js'
import suspendUserTool from './users/suspend-user.js'
import reactivateUserTool from './users/reactivate-user.js'
import listUserTeamsTool from './users/list-user-teams.js'
import listUserRolesTool from './users/list-user-roles.js'
import listWorkflowsTool from './workflows/list-workflows.js'
import getWorkflowTool from './workflows/get-workflow.js'
import listAuditLogsTool from './audit-logs/list-audit-logs.js'
import listProxyApplicantsTool from './proxy-applicants/list-proxy-applicants.js'
import createProxyApplicantTool from './proxy-applicants/create-proxy-applicant.js'
import deleteProxyApplicantTool from './proxy-applicants/delete-proxy-applicant.js'
import listProxyApproversTool from './proxy-approvers/list-proxy-approvers.js'
import createProxyApproverTool from './proxy-approvers/create-proxy-approver.js'
import deleteProxyApproverTool from './proxy-approvers/delete-proxy-approver.js'
import listRoutesTool from './routes/list-routes.js'
import getRouteTool from './routes/get-route.js'

export const allTools = [
  listCategoriesTool,
  createCategoryTool,
  deleteCategoryTool,
  updateCategoryTool,
  listFoldersTool,
  createFolderTool,
  deleteFolderTool,
  updateFolderTool,
  getFolderTool,
  listGeneralMastersTool,
  createGeneralMasterTool,
  getGeneralMasterTool,
  updateGeneralMasterTool,
  deleteGeneralMasterTool,
  listGeneralMasterItemsTool,
  createGeneralMasterItemTool,
  getGeneralMasterItemTool,
  updateGeneralMasterItemTool,
  deleteGeneralMasterItemTool,
  listGradesTool,
  createGradeTool,
  getGradeTool,
  deleteGradeTool,
  updateGradeTool,
  setDefaultGradeTool,
  listOrganizationChartsTool,
  createOrganizationChartTool,
  deleteOrganizationChartTool,
  getOrganizationChartTool,
  updateOrganizationChartTool,
  getCurrentOrganizationChartTool,
  activateOrganizationChartTool,
  listTeamsTool,
  createTeamTool,
  getTeamTool,
  updateTeamTool,
  deleteTeamTool,
  listTeamMembersTool,
  createTeamMembersTool,
  deleteTeamMembersTool,
  updateTeamMemberTool,
  listRolesTool,
  createRoleTool,
  getRoleTool,
  updateRoleTool,
  deleteRoleTool,
  createRoleMembersTool,
  listRoleMembersTool,
  deleteRoleMemberTool,
  getTicketTool,
  listTicketsTool,
  listTasksTool,
  approveTicketTool,
  rejectTicketTool,
  denyTicketTool,
  withdrawTicketTool,
  archiveTicketTool,
  listTicketLinksTool,
  listViewersTool,
  createViewerTool,
  deleteViewerTool,
  listCommentsTool,
  createCommentTool,
  getCommentTool,
  updateCommentTool,
  deleteCommentTool,
  getCurrentUserTool,
  listUsersTool,
  createUserTool,
  getUserTool,
  listProxyApplicantsTool,
  createProxyApplicantTool,
  deleteProxyApplicantTool,
  listProxyApproversTool,
  createProxyApproverTool,
  deleteProxyApproverTool,
  listRoutesTool,
  getRouteTool,
  deleteUserTool,
  updateUserTool,
  lookupUserByEmailTool,
  reinviteUserTool,
  suspendUserTool,
  reactivateUserTool,
  listUserTeamsTool,
  listUserRolesTool,
  listWorkflowsTool,
  getWorkflowTool,
  listAuditLogsTool,
]
