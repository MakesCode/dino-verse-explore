import type { RentalApprovalsGateway } from '../../../pro/app/features/gli/RentalApprovals/api-rentalApprovals';
import type { SmartGarantGrid, SmartGarantResponse } from '../../../pro/app/features/common/model/SmartGarantResponse';
import {
  GuarantorLink,
  GliRentalApprovalStatus,
  RealEstateLotType,
  type RentalApproval,
} from '../../../pro/app/features/gli/RentalApprovals/model/RentalApproval';
import type {
  getRentalApprovalsRequest,
  getSubscriptionRentalApprovalsRequest,
  postArchiveProjectRequest,
} from '../../../pro/app/features/gli/RentalApprovals/model/request';
import { ProfessionalStatus } from '../../../pro/app/features/common/model/ProfessionalStatus';

// Simple in-memory dataset for mocks
const nowIso = () => new Date().toISOString();

function makeResponse<T>(payload: T): SmartGarantResponse<T> {
  return {
    requestId: `mock-${Date.now()}`,
    payload,
    error: { errorCode: '', message: '' },
    resultStats: 0,
  };
}

function makeRentalApproval(seed: number): RentalApproval {
  const id = `ra-${seed}`;
  const statusList = [
    GliRentalApprovalStatus.Draft,
    GliRentalApprovalStatus.PendingDocument,
    GliRentalApprovalStatus.Pending,
    GliRentalApprovalStatus.Approved,
    GliRentalApprovalStatus.Active,
  ];
  const status = statusList[seed % statusList.length];

  return {
    externalId: seed,
    isArchived: false,
    subscription: {
      id: 'sub-mock-1',
      organization: { id: 'org-1', name: 'Agence Mock Immo', type: 1 },
    },
    status,
    businessData: {
      realEstateUsage: 1,
      hasFurnished: seed % 2 === 0,
      sittingTenant: false,
      rentAmount: 850 + seed * 10,
      chargesAmount: 50,
      rentAmountWithCharges: 900 + seed * 10,
      depositAmount: 900,
      isBalanceUpToDate: true,
      hadConflict: false,
      hasDepartureNotice: false,
      hasVisaleCoverage: false,
      startLeaseDate: nowIso(),
    },
    realEstateLot: {
      documentIds: [],
      subscription: {
        id: 'sub-mock-1',
        organization: { id: 'org-1', name: 'Agence Mock Immo', type: 1 },
      },
      externalId: `lot-${seed}`,
      address: {
        fullAddress: `${10 + seed} Rue de la Paix, 7500${seed % 10} Paris`,
        country: 'FR',
        address: `${10 + seed} Rue de la Paix`,
        zipCode: `7500${seed % 10}`,
        city: 'Paris',
        isManual: true,
      },
      type: RealEstateLotType.APARTMENT,
      surface: 45 + seed,
      roomsNumber: 2,
      floor: seed % 6,
      sequence: seed,
      createDate: nowIso(),
      id,
      idString: id,
    },
    owners: [
      {
        documentIds: [],
        role: 1,
        type: 1,
        externalId: `owner-${seed}`,
        naturalEntity: {
          externalId: `nat-owner-${seed}`,
          title: 1,
          firstName: 'Marie',
          lastName: 'Dupont',
          birthDate: '1980-05-12',
          phone: { phoneOrigin: 'FR', phoneContryCode: '+33', phoneFormated: '06 01 02 03 04' },
          email: 'marie.dupont@example.com',
        },
        legalEntity: {
          externalId: `leg-owner-${seed}`,
          name: 'SCI Les Tilleuls',
          phone: { phoneOrigin: 'FR', phoneContryCode: '+33', phoneFormated: '01 23 45 67 89' },
          email: 'contact@sci-tilleuls.fr',
        },
        subscription: {
          id: 'sub-mock-1',
          organization: { id: 'org-1', name: 'Agence Mock Immo', type: 1 },
        },
        searchField: 'Marie Dupont SCI Les Tilleuls',
        sequence: 1,
        createDate: nowIso(),
        id: `owner-${seed}`,
        idString: `owner-${seed}`,
      },
    ],
    tenants: [
      {
        id: `tenant-${seed}`,
        professionalStatus: ProfessionalStatus.PrivateCDI,
        incomes: 2800 + seed * 25,
        hasAdditionalIncomes: false,
        incomesChangeAtLease: false,
        tenant: {
          naturalEntity: {
            externalId: `nat-tenant-${seed}`,
            title: 1,
            firstName: 'Jean',
            lastName: `Martin-${seed}`,
            birthDate: '1990-04-04',
            phone: { phoneOrigin: 'FR', phoneContryCode: '+33', phoneFormated: '06 11 22 33 44' },
            email: `jean.martin${seed}@example.com`,
          },
        },
        guarantors: [
          {
            id: `gar-${seed}`,
            professionalStatus: ProfessionalStatus.PrivateCDI,
            hasAdditionalIncomes: false,
            incomesChangeAtLease: false,
            guarantor: {
              naturalEntity: {
                externalId: `nat-gar-${seed}`,
                title: 1,
                firstName: 'Claire',
                lastName: 'Martin',
                birthDate: '1965-01-01',
                phone: { phoneOrigin: 'FR', phoneContryCode: '+33', phoneFormated: '06 55 66 77 88' },
                email: 'claire.martin@example.com',
              },
            },
            documentIds: [],
            link: GuarantorLink.Parent,
          },
        ],
        documentIds: [],
      },
    ],
    policy: {
      externalFleetElementId: `fle-${seed}`,
      externalPolicyId: `pol-${seed}`,
      entryDate: nowIso(),
      leaseEffectiveDate: nowIso(),
      exitDate: nowIso(),
    },
    sequence: seed,
    createDate: nowIso(),
    updateDate: nowIso(),
    id,
    idString: id,
    effectiveDate: nowIso(),
    guaranteeDeadline: nowIso(),
    references: {
      rentalApprovalRef: `RA-${1000 + seed}`,
      policyRef: `P-${1000 + seed}`,
    },
  };
}

const MOCK_DATASET: RentalApproval[] = Array.from({ length: 25 }, (_, i) => makeRentalApproval(i + 1));

export class MockRentalApprovalsGateway implements RentalApprovalsGateway {
  private data: RentalApproval[];

  constructor(seedData: RentalApproval[] = MOCK_DATASET) {
    this.data = JSON.parse(JSON.stringify(seedData));
  }

  async getRentalApprovals({ params }: getRentalApprovalsRequest): Promise<SmartGarantResponse<SmartGarantGrid<RentalApproval>>> {
    const { search, pageIndex, limite, status } = params;

    // basic filtering
    let filtered = this.data.filter((ra) => true);

    if (status != null) {
      filtered = filtered.filter((ra) => ra.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((ra) => {
        const owner = ra.owners?.[0]?.naturalEntity?.lastName || '';
        const tenant = ra.tenants?.[0]?.tenant?.naturalEntity?.lastName || '';
        const address = ra.realEstateLot?.address?.fullAddress || '';
        const ref = ra.references?.rentalApprovalRef || '';
        return [owner, tenant, address, ref].some((s) => s?.toLowerCase().includes(q));
      });
    }

    const start = Math.max(0, (pageIndex || 0) * (limite || 10));
    const end = start + (limite || 10);
    const page = filtered.slice(start, end);

    return makeResponse({ data: page, rowCount: filtered.length });
  }

  async postArchiveProject({ params }: postArchiveProjectRequest): Promise<SmartGarantResponse<any>> {
    const idx = this.data.findIndex((ra) => ra.id === params.rentalApprovalId);
    if (idx >= 0) {
      this.data[idx].isArchived = !this.data[idx].isArchived;
    }
    return makeResponse({ archived: this.data[idx]?.isArchived ?? false });
  }

  async getSubscriptionRentalApprovals({ params }: getSubscriptionRentalApprovalsRequest): Promise<SmartGarantResponse<RentalApproval>> {
    const match = this.data.find((ra) => ra.id === params.rentalApprovalId) || this.data[0];
    return makeResponse(match);
  }
}

export default MockRentalApprovalsGateway;
