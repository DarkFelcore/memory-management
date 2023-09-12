using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Job : BaseEntity
    {
        public string Title { get; set; }
        public JobLevel Level { get; set; }

        // Relation with company
        public long CompanyId { get; set; }
        public Company Company { get; set; }

        // Relation with candiate
        public List<Candidate> Candidates { get; set; }
    }
}
